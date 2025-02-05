import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "./reducers/graphSlice";
import stylingReducer from "./reducers/stylingSlice";
import historyReducer from "./reducers/historySlice";

export const store = configureStore({
  reducer: {
    graph: graphReducer,
    styling: stylingReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
