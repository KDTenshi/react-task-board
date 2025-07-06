import { useState, type FC } from "react";
import style from "./Board.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { Column } from "../../Column";
import { addColumn, changeTaskColumn, changeTaskPosition } from "../../../shared/store/boardSlice";
import { DndContext, DragOverlay, pointerWithin, type DragOverEvent, type DragStartEvent } from "@dnd-kit/core";
import { selectTask, unselectItems } from "../../../shared/store/dndSlice";
import { Task } from "../../Task";

const Board: FC = () => {
  const columns = useAppSelector((state) => state.board.columns);
  const activeTask = useAppSelector((state) => state.dnd.activeTask);

  const [isAdd, setIsAdd] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();

  const handleAdd = () => {
    const title = value.trim();

    if (title) {
      dispatch(addColumn({ title }));
    }

    setValue("");
    setIsAdd(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAdd();
  };

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;

    const activeId = active.id as string;

    const activeColumn = columns.find((column) => column.tasks.some((task) => task.id === activeId));

    if (activeColumn) {
      const activeTask = activeColumn.tasks.find((task) => task.id === activeId);

      if (activeTask) {
        dispatch(selectTask({ task: activeTask, column: activeColumn }));
      }
    }
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (over) {
      const activeCurrent = active.data.current;
      const overCurrent = over.data.current;

      if (activeCurrent && overCurrent) {
        if (overCurrent.type === "column") {
          const activeId = active.id as string;
          const overId = over.id as string;

          dispatch(changeTaskColumn({ taskId: activeId, columnToId: overId }));
        }

        if (overCurrent.type === "task") {
          const activeId = active.id as string;
          const overId = over.id as string;

          dispatch(changeTaskPosition({ activeTaskId: activeId, overTaskId: overId }));
        }
      }
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
      >
        {columns.map((column) => (
          <Column column={column} key={column.id} />
        ))}
        <DragOverlay>{activeTask && <Task task={activeTask} />}</DragOverlay>
      </DndContext>
      {!isAdd && (
        <button className={style.Button} onClick={() => setIsAdd(true)}>
          Add column
        </button>
      )}
      {isAdd && (
        <form className={style.Add} onSubmit={handleSubmit}>
          <input
            type="text"
            className={style.Input}
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleAdd}
          />
        </form>
      )}
    </div>
  );
};

export default Board;
