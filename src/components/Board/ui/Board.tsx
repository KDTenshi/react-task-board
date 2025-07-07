import { type FC } from "react";
import style from "./Board.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { Column } from "../../Column";
import {
  addColumn,
  changeColumnPosition,
  changeTaskColumn,
  changeTaskPosition,
} from "../../../shared/store/boardSlice";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { selectColumn, selectTask, unselectItems } from "../../../shared/store/dndSlice";
import { Task } from "../../Task";
import { SortableContext } from "@dnd-kit/sortable";

const Board: FC = () => {
  const columns = useAppSelector((state) => state.board.columns);

  const activeTask = useAppSelector((state) => state.dnd.activeTask);
  const activeColumn = useAppSelector((state) => state.dnd.activeColumn);
  const activeType = useAppSelector((state) => state.dnd.activeType);

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  const sensors = useSensors(mouseSensor);

  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(addColumn({ title: "New column" }));
  };

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;

    const { current } = active.data;

    if (!current) return;

    const activeId = active.id as string;

    if (current.type === "task") {
      const activeColumn = columns.find((column) => column.tasks.some((task) => task.id === activeId));

      if (!activeColumn) return;

      const activeTask = activeColumn.tasks.find((task) => task.id === activeId);

      if (!activeTask) return;

      dispatch(selectTask({ task: activeTask, column: activeColumn }));
    }

    if (current.type === "column") {
      const activeColumn = columns.find((column) => column.id === activeId);

      if (!activeColumn) return;

      dispatch(selectColumn({ column: activeColumn }));
    }
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;

    const activeCurrent = active.data.current;
    const overCurrent = over.data.current;

    if (!activeCurrent || !overCurrent) return;

    if (activeCurrent.type === "task") {
      if (overCurrent.type === "column") {
        dispatch(changeTaskColumn({ taskId: activeId, columnToId: overId }));
      }
      if (overCurrent.type === "task") {
        dispatch(changeTaskPosition({ activeTaskId: activeId, overTaskId: overId }));
      }
    }

    if (activeCurrent.type === "column") {
      dispatch(changeColumnPosition({ activeColumnId: activeId, overColumnId: overId }));
    }
  };

  const handleDragEnd = () => {
    dispatch(unselectItems());
  };

  return (
    <div className={style.Board}>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
        sensors={sensors}
      >
        <SortableContext items={columns}>
          {columns.map((column) => (
            <Column column={column} key={column.id} />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeType === "task" && activeTask && <Task task={activeTask} />}
          {activeType === "column" && activeColumn && <Column column={activeColumn} />}
        </DragOverlay>
      </DndContext>
      <button className={style.Button} onClick={handleAdd}>
        Add column
      </button>
    </div>
  );
};

export default Board;
