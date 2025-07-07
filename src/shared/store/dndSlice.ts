import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumn, TTask } from "../types/types";

type DndState = {
  activeTask: TTask | null;
  activeColumn: TColumn | null;
  activeType: "task" | "column" | null;
};

const initialState: DndState = {
  activeColumn: null,
  activeTask: null,
  activeType: null,
};

export const dndSlice = createSlice({
  name: "dnd",
  initialState,
  reducers: {
    selectTask: (state, action: PayloadAction<{ task: TTask; column: TColumn }>) => {
      const { task, column } = action.payload;

      state.activeColumn = column;
      state.activeTask = task;
      state.activeType = "task";
    },
    selectColumn: (state, action: PayloadAction<{ column: TColumn }>) => {
      const { column } = action.payload;

      state.activeColumn = column;
      state.activeType = "column";
    },
    unselectItems: (state) => {
      state.activeColumn = null;
      state.activeTask = null;
      state.activeType = null;
    },
  },
});

export const { selectTask, selectColumn, unselectItems } = dndSlice.actions;
