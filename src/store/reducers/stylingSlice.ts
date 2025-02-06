import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface NodeStyle {
  color: string;
  fontSize: number;
}

interface StylingState {
  nodeStyles: Record<string, NodeStyle>;
}

const initialState: StylingState = {
  nodeStyles: {},
};

const stylingSlice = createSlice({
  name: "styling",
  initialState,
  reducers: {
    updateNodeColor: (
      state,
      action: PayloadAction<{ id: string; color: string }>
    ) => {
      const { id, color } = action.payload;
      if (!state.nodeStyles[id]) {
        state.nodeStyles[id] = { color, fontSize: 14 };
      } else {
        state.nodeStyles[id].color = color;
      }
    },
    updateNodeFontSize: (
      state,
      action: PayloadAction<{ id: string; fontSize: number }>
    ) => {
      const { id, fontSize } = action.payload;

      if (!state.nodeStyles[id]) {
        state.nodeStyles[id] = { color: "#DDEB9D", fontSize };
      } else {
        state.nodeStyles[id].fontSize = fontSize;
      }
    },
  },
});

export const { updateNodeColor, updateNodeFontSize } = stylingSlice.actions;
export default stylingSlice.reducer;
