import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HistoryState } from "../../types/type";

const initialState: HistoryState = {
  past: [],
  present: null,
  future: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<any>) => {
      if (JSON.stringify(state?.present) !== JSON.stringify(action?.payload)) {
        state?.past?.push(state?.present);
        state.present = action?.payload;
        state.future = [];
      }
    },
    undo: (state) => {
      if (state?.past?.length > 0) {
        const previous = state?.past?.pop();
        if (state.present !== null) {
          state?.future?.push(state?.present);
        }
        state.present = { ...previous };
      }
    },
    redo: (state) => {
      if (state?.future?.length > 0) {
        const next = state?.future?.pop();

        if (state?.present !== null) {
          state?.past?.push({ ...state?.present });
        }

        state.present = { ...next };
      }
    },
  },
});

export const { addToHistory, undo, redo } = historySlice.actions;
export default historySlice.reducer;
