import type { FC } from "react";
import style from "./Column.module.css";
import type { TColumn } from "../../../shared/types/types";
import { Task } from "../../Task";

interface ColumnProps {
  column: TColumn;
}

const Column: FC<ColumnProps> = ({ column }) => {
  return (
    <div className={style.Column}>
      <div className={style.Head}>
        <div className={style.Actions}>
          <button className={style.Button}>Edit</button>
          <button className={style.Button}>Delete</button>
          <button className={style.Button}>Drag</button>
        </div>
        <h2 className={style.Title}>{column.title}</h2>
      </div>
      <div className={style.Container}>
        {column.tasks.length === 0 && <h3 className={style.Empty}>No tasks here</h3>}
        {column.tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default Column;
