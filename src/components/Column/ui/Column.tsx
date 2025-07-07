import { type FC } from "react";
import style from "./Column.module.css";
import type { TColumn } from "../../../shared/types/types";
import { Task } from "../../Task";
import { useAppDispatch } from "../../../app/store/appStore";
import { addTask, deleteColumn } from "../../../shared/store/boardSlice";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ColumnProps {
  column: TColumn;
}

const Column: FC<ColumnProps> = ({ column }) => {
  const { attributes, listeners, transform, setNodeRef, setDroppableNodeRef } = useSortable({
    id: column.id,
    data: { type: "column" },
  });

  const draggingStyle: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };

  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    dispatch(addTask({ columnId: column.id, title: "Test Task" }));
  };

  const handleDelete = () => {
    dispatch(deleteColumn({ columnId: column.id }));
  };

  return (
    <div className={style.Column} ref={setNodeRef} style={draggingStyle}>
      <div className={style.Head}>
        <div className={style.Actions}>
          <button className={style.Button} onClick={handleDelete}>
            Delete
          </button>
          <button className={style.Button} {...attributes} {...listeners}>
            Drag
          </button>
        </div>
        <h2 className={style.Title}>{column.title}</h2>
      </div>
      <div className={style.Container} ref={setDroppableNodeRef}>
        <button className={style.Add} onClick={handleAddTask}>
          Add task
        </button>
        {column.tasks.length === 0 && <h3 className={style.Empty}>No tasks here</h3>}
        <SortableContext items={column.tasks}>
          {column.tasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
