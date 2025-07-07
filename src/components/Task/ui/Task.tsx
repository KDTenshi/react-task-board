import { type FC } from "react";
import style from "./Task.module.css";
import type { TTask } from "../../../shared/types/types";
import { useAppDispatch } from "../../../app/store/appStore";
import { deleteTask } from "../../../shared/store/boardSlice";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const { transform, attributes, listeners, setNodeRef } = useSortable({ id: task.id, data: { type: "task" } });

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteTask({ taskId: task.id }));
  };

  const draggingStyle: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div className={style.Task} style={draggingStyle} {...attributes} {...listeners} ref={setNodeRef}>
      <div className={style.Info}>
        <h3 className={style.Title}>{task.title}</h3>
        <p className={style.Date}>{task.date}</p>
      </div>
      <div className={style.Actions}>
        <button className={style.Button} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
