import { configureStore } from "@reduxjs/toolkit"
import graphReducer from "./graphSlice"
import stylingReducer from "./stylingSlice"
import historyReducer from "./historySlice"

export const store = configureStore({
  reducer: {
    graph: graphReducer,
    styling: stylingReducer,
    history: historyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

