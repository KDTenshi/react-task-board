import type { FC } from "react";
import style from "./Task.module.css";
import type { TTask } from "../../../shared/types/types";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  return (
    <div className={style.Task}>
      <div className={style.Info}>
        <h3 className={style.Title}>{task.title}</h3>
        <p className={style.Date}>{task.date}</p>
      </div>
      <div className={style.Actions}>
        <button className={style.Button}>Edit</button>
        <button className={style.Button}>Delete</button>
      </div>
    </div>
  );
};

export default Task;
