import type React from "react";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
} from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import {
  setSelectedNode,
  updateNodePosition,
} from "../store/reducers/graphSlice";
import { addToHistory } from "../store/reducers/historySlice";
import CustomNode from "./CustomNode";
import ControlPanel from "./ControlPanel";
import "reactflow/dist/style.css";
import { useRef } from "react";
const nodeTypes = {
  custom: CustomNode,
};

const GraphVisualization: React.FC = () => {
  const dispatch = useDispatch();

  const { nodes: storeNodes, edges: storeEdges } = useSelector(
    (state: RootState) => state.graph
  );
  const nodeStyles = useSelector(
    (state: RootState) => state.styling.nodeStyles
  );
  const historyPresent = useSelector(
    (state: RootState) => state.history.present
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);

  const initialPositions = useRef<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        nodeStyles[node.id]
          ? {
              ...node,
              data: { ...node.data, style: nodeStyles[node.id] },
            }
          : node
      )
    );
  }, [nodeStyles, setNodes]);

  useEffect(() => {
    if (historyPresent) {
      if (historyPresent.type === "NODE_MOVE") {
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === historyPresent.id
              ? { ...node, position: historyPresent.position }
              : node
          )
        );
      }
      if (historyPresent.type === "STYLE_CHANGE") {
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === historyPresent.id
              ? { ...node, data: { ...node.data, style: historyPresent.style } }
              : node
          )
        );
      }
    }
  }, [historyPresent, nodes]);

  const onNodeDragStart = useCallback(
    (event: React.MouseEvent, node: Node) => {
      initialPositions.current[node.id] = { ...node.position };
      dispatch(
        addToHistory({
          type: "NODE_MOVE",
          id: node.id,
          position: node.position,
        })
      );
    },
    [dispatch]
  );

  const onNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const prevPosition = initialPositions.current[node.id];
      const newPosition = node.position;

      if (
        prevPosition &&
        (prevPosition.x !== newPosition.x || prevPosition.y !== newPosition.y)
      ) {
        dispatch(updateNodePosition({ id: node.id, position: newPosition }));
        dispatch(
          addToHistory({
            type: "NODE_MOVE",
            id: node.id,
            position: newPosition,
          })
        );
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
        onNodeDragStart={onNodeDragStart}
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
  );
};

export default GraphVisualization;
