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
import { updateNodePosition } from "../store/reducers/graphSlice";
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
    (state: RootState) => state?.styling?.nodeStyles
  );
  const historyPresent = useSelector(
    (state: RootState) => state?.history?.present
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes);
  const [edges, _, onEdgesChange] = useEdgesState(storeEdges);

  const initialPositions = useRef<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    //This effect updates the nodestyles whenever `nodeStyles` in the Redux store changes.
    // It ensures that any style updates (like color or fontsize changes) are immediately reflected in the UI.

    setNodes((prevNodes) =>
      prevNodes.map(
        (node) =>
          nodeStyles[node?.id] // Check if there are styles for this specific node
            ? {
                ...node, // Keep the existing node properties
                data: { ...node?.data, style: nodeStyles[node?.id] }, // Apply new styles to the node's data
              }
            : node // If no new styles are found, return the node unchanged
      )
    );
  }, [nodeStyles, setNodes]);

  useEffect(() => {
    // This effect listens for changes in the `historyPresent` redux state.
    // It handles undo/redo actions for node position changes and styles changes.

    if (historyPresent) {
      // If the last action was moving a node, update its position in the UI.
      if (historyPresent.type === "NODE_MOVE") {
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === historyPresent.id // Check if this is the node that was moved
              ? { ...node, position: historyPresent.position } // It update the node's position
              : node
          )
        );
      }
      // If the last action was Style change like color change or fontSize change, update its style in the UI.
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
    (_: React.MouseEvent, node: Node) => {
      initialPositions.current[node?.id] = { ...node?.position };

      dispatch(
        addToHistory({
          type: "NODE_MOVE",
          id: node?.id,
          position: node?.position,
        })
      );
    },
    [dispatch]
  );

  const onNodeDragStop = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const prevPosition = initialPositions?.current[node?.id];
      const newPosition = node?.position;

      if (
        prevPosition &&
        (prevPosition?.x !== newPosition?.x ||
          prevPosition?.y !== newPosition?.y)
      ) {
        dispatch(updateNodePosition({ id: node?.id, position: newPosition }));
        dispatch(
          addToHistory({
            type: "NODE_MOVE",
            id: node?.id,
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
