import type React from "react"
import { useCallback, useEffect } from "react"
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState, type Node } from "reactflow"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store"
import { setSelectedNode, updateNodePosition } from "../store/graphSlice"
import { addToHistory } from "../store/historySlice"
import CustomNode from "./CustomNode"
import ControlPanel from "./ControlPanel"
import "reactflow/dist/style.css";

const nodeTypes = {
  custom: CustomNode,
}

const GraphVisualization: React.FC = () => {
  const dispatch = useDispatch()
  const { nodes: storeNodes, edges: storeEdges } = useSelector((state: RootState) => state.graph)
  const nodeStyles = useSelector((state: RootState) => state.styling.nodeStyles)
  const historyPresent = useSelector((state: RootState) => state.history.present)

  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges)

  useEffect(() => {
    setNodes(
      storeNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          style: nodeStyles[node.id] || { color: "#000000", fontSize: 14 },
        },
      })),
    )
  }, [storeNodes, nodeStyles, setNodes])

  useEffect(() => {
    if (historyPresent) {
      if (historyPresent.type === "NODE_MOVE") {
        setNodes((nodes) =>
          nodes.map((node) => (node.id === historyPresent.id ? { ...node, position: historyPresent.position } : node)),
        )
      } if (historyPresent.type === "STYLE_CHANGE") {
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === historyPresent.id ? { ...node, data: { ...node.data, style: historyPresent.style } } : node,
          ),
        )
      }
    }
  }, [historyPresent, , setNodes, nodes])

  const onNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node) => {
      dispatch(updateNodePosition({ id: node.id, position: node.position }))
      dispatch(addToHistory({ type: "NODE_MOVE", id: node.id, position: node.position }))
    },
    [dispatch],
  )

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (node && node.id) {
        dispatch(setSelectedNode({ id: node.id }));
      }
    },
    [dispatch]
  );


  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeClick={onNodeClick}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeDragStop={onNodeDragStop}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <ControlPanel />
    </div>
  )
}

export default GraphVisualization

