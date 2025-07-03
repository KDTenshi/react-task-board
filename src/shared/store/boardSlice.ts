import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumn, TTask } from "../types/types";

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
  reducers: {
    addTask: (state, action: PayloadAction<{ columnId: string; title: string }>) => {
      const { columnId, title } = action.payload;

      const column = state.columns.find((column) => column.id === columnId);

      if (column) {
        const newTask: TTask = {
          id: `${Date.now()}`,
          title,
          description: "",
          date: Date.now(),
        };

        column.tasks.push(newTask);
      }
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string }>) => {
      const { taskId } = action.payload;

      const column = state.columns.find((column) => column.tasks.some((task) => task.id === taskId));

      if (column) {
        column.tasks = column.tasks.filter((task) => task.id !== taskId);
      }
    },
  },
});

export const { addTask, deleteTask } = boardSlice.actions;
