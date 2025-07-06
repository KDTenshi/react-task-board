import { combineReducers } from "@reduxjs/toolkit";
import { boardSlice } from "../../shared/store/boardSlice";
import { dndSlice } from "../../shared/store/dndSlice";

export const appReducer = combineReducers({
  [boardSlice.reducerPath]: boardSlice.reducer,
  [dndSlice.reducerPath]: dndSlice.reducer,
});
