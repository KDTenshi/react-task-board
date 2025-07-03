import { createSlice } from "@reduxjs/toolkit";
import type { TColumn } from "../types/types";

type BoardState = {
  columns: TColumn[];
};

const initialState: BoardState = {
  columns: [
    { id: "c001", title: "To Do", tasks: [{ id: "001", title: "Task 1", description: "", date: 123 }] },
    { id: "c002", title: "To Do 2", tasks: [{ id: "002", title: "Task 2", description: "", date: 123 }] },
  ],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
});
