import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Node, Edge } from "reactflow";

interface GraphState {
  selectedId: string | null;
  nodes: Node[];
  edges: Edge[];
}

const initialNodes: Node[] = Array.from({ length: 10 }, (_, i) => ({
  id: `${i}`,
  type: "custom",
  data: {
    label: `Node ${i}`,
    style: { color: "#DDEB9D", fontSize: 14 },
  },
  position: { x: Math.random() * 500, y: Math.random() * 500 },
}));

const initialEdges: Edge[] = [];
for (let i = 0; i < initialNodes.length; i++) {
  for (let j = i + 1; j < initialNodes.length; j++) {
    initialEdges.push({
      id: `e${i}-${j}`,
      source: `${i}`,
      target: `${j}`,
      animated: true,
    });
  }
}

const initialState: GraphState = {
  selectedId: null,
  nodes: initialNodes,
  edges: initialEdges,
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setSelectedNode: (state, action: PayloadAction<{ id: string | null }>) => {
      state.selectedId = action.payload.id;
    },
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.position = action.payload.position;
      }
    },
  },
});

export const { setSelectedNode, updateNodePosition } = graphSlice.actions;
export default graphSlice.reducer;
