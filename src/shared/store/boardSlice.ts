import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumn, TTask } from "../types/types";
import { arrayMove } from "@dnd-kit/sortable";

type BoardState = {
  columns: TColumn[];
};

const initialState: BoardState = {
  columns: [
    { id: "c001", title: "To Do", tasks: [{ id: "001", title: "Task 1", date: 123 }] },
    { id: "c002", title: "To Do 2", tasks: [{ id: "002", title: "Task 2", date: 123 }] },
  ],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ columnId: string; title: string }>) => {
      const { columnId, title } = action.payload;

      const column = state.columns.find((column) => column.id === columnId);

      if (!column) return;

      const newTask: TTask = {
        id: `${Date.now()}`,
        title,
        date: Date.now(),
      };

      column.tasks.push(newTask);
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string }>) => {
      const { taskId } = action.payload;

      const column = state.columns.find((column) => column.tasks.some((task) => task.id === taskId));

      if (!column) return;

      column.tasks = column.tasks.filter((task) => task.id !== taskId);
    },
    addColumn: (state, action: PayloadAction<{ title: string }>) => {
      const { title } = action.payload;

      const newColumn: TColumn = {
        id: `T-${Date.now()}`,
        title,
        tasks: [],
      };

      state.columns.push(newColumn);
    },
    deleteColumn: (state, action: PayloadAction<{ columnId: string }>) => {
      const { columnId } = action.payload;

      state.columns = state.columns.filter((column) => column.id !== columnId);
    },
    changeTaskPosition: (state, action: PayloadAction<{ activeTaskId: string; overTaskId: string }>) => {
      const { activeTaskId, overTaskId } = action.payload;

      const column = state.columns.find((column) =>
        column.tasks.some((task) => task.id === activeTaskId || task.id === overTaskId)
      );

      if (!column) return;

      const activeTaskIndex = column.tasks.findIndex((task) => task.id === activeTaskId);
      const overTaskIndex = column.tasks.findIndex((task) => task.id === overTaskId);

      if (activeTaskIndex === -1 || overTaskIndex === -1) return;

      column.tasks = arrayMove(column.tasks, activeTaskIndex, overTaskIndex);
    },
    changeTaskColumn: (state, action: PayloadAction<{ columnToId: string; taskId: string }>) => {
      const { columnToId, taskId } = action.payload;

      const columnFrom = state.columns.find((column) => column.tasks.some((task) => task.id === taskId));
      const columnTo = state.columns.find((column) => column.id === columnToId);

      if (!columnFrom || !columnTo) return;

      const task = columnFrom.tasks.find((task) => task.id === taskId);

      if (!task) return;

      columnFrom.tasks = columnFrom.tasks.filter((task) => task.id !== taskId);
      columnTo.tasks.push(task);
    },
    changeColumnPosition: (state, action: PayloadAction<{ activeColumnId: string; overColumnId: string }>) => {
      const { activeColumnId, overColumnId } = action.payload;

      const activeColumnIndex = state.columns.findIndex((column) => column.id === activeColumnId);
      const overColumnIndex = state.columns.findIndex((column) => column.id === overColumnId);

      if (activeColumnIndex === -1 || overColumnIndex === -1) return;

      state.columns = arrayMove(state.columns, activeColumnIndex, overColumnIndex);
    },
  },
});

export const {
  addTask,
  deleteTask,
  addColumn,
  deleteColumn,
  changeTaskPosition,
  changeTaskColumn,
  changeColumnPosition,
} = boardSlice.actions;
