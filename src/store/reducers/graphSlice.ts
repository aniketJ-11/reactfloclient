import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { GraphState } from "../../types/type";
import { initialEdges, initialNodes } from "../../utils/nodesAndEdges";

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
      state.selectedId = action?.payload?.id;
    },
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) => {
      const node = state?.nodes?.find((n) => n?.id === action?.payload?.id);
      if (node) {
        node.position = action?.payload?.position;
      }
    },
  },
});

export const { setSelectedNode, updateNodePosition } = graphSlice.actions;
export default graphSlice.reducer;
