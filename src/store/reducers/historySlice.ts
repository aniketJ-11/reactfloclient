import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface HistoryState {
  past: any[];
  present: any | null;
  future: any[];
}

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
      state.past.push(state.present);
      state.present = action.payload;
      state.future = [];
    },
    undo: (state) => {
      if (state.past.length > 0) {
        const previous = state.past.pop();
        if (state.present !== null) {
          state.future.push(state.present);
        }
        state.present = { ...previous };
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const next = state.future.shift();

        if (state.present !== null) {
          state.past.push({ ...state.present });
        }

        state.present = { ...next };
      }
    },
  },
});

export const { addToHistory, undo, redo } = historySlice.actions;
export default historySlice.reducer;
