import { useState, type FC } from "react";
import style from "./Task.module.css";
import type { TTask } from "../../../shared/types/types";
import { useAppDispatch } from "../../../app/store/appStore";
import { deleteTask, editTask } from "../../../shared/store/boardSlice";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(task.title);

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteTask({ taskId: task.id }));
  };

  const handleEdit = () => {
    const title = value.trim();

    if (title) {
      dispatch(editTask({ taskId: task.id, title }));
      setValue(title);
    } else {
      setValue(task.title);
    }

    setIsEdit(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEdit();
  };

  return (
    <div className={style.Task}>
      {isEdit && (
        <form className={style.Edit} onSubmit={handleSubmit}>
          <input
            type="text"
            className={style.Input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            onBlur={handleEdit}
          />
        </form>
      )}
      {!isEdit && (
        <div className={style.Info}>
          <h3 className={style.Title}>{task.title}</h3>
          <p className={style.Date}>{task.date}</p>
        </div>
      )}
      <div className={style.Actions}>
        <button className={style.Button} onClick={() => setIsEdit((prev) => !prev)}>
          Edit
        </button>
        <button className={style.Button} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
