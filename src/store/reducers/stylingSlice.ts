import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { StylingState } from "../../types/type";
import { nodeBgColor, nodeFontSize } from "../../utils/nodeDefaultColor";

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
      const { id, color } = action?.payload;
      if (!state?.nodeStyles[id]) {
        state.nodeStyles[id] = { color, fontSize: nodeFontSize };
      } else {
        state.nodeStyles[id].color = color;
      }
    },
    updateNodeFontSize: (
      state,
      action: PayloadAction<{ id: string; fontSize: number }>
    ) => {
      const { id, fontSize } = action?.payload;

      if (!state.nodeStyles[id]) {
        state.nodeStyles[id] = { color: nodeBgColor, fontSize };
      } else {
        state.nodeStyles[id].fontSize = fontSize;
      }
    },
  },
});

export const { updateNodeColor, updateNodeFontSize } = stylingSlice.actions;
export default stylingSlice.reducer;
