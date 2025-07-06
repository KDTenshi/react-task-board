import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumn, TTask } from "../types/types";

type DndState = {
  activeTask: TTask | null;
  activeColumn: TColumn | null;
  // selectedType: "task" | "column" | null;
};

const initialState: DndState = {
  activeColumn: null,
  activeTask: null,
};

export const dndSlice = createSlice({
  name: "dnd",
  initialState,
  reducers: {
    selectTask: (state, action: PayloadAction<{ task: TTask; column: TColumn }>) => {
      const { task, column } = action.payload;

      state.activeColumn = column;
      state.activeTask = task;
    },
    unselectItems: (state) => {
      state.activeColumn = null;
      state.activeTask = null;
    },
  },
});

export const { selectTask, unselectItems } = dndSlice.actions;
