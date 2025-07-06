import { useState, type FC } from "react";
import style from "./Column.module.css";
import type { TColumn } from "../../../shared/types/types";
import { Task } from "../../Task";
import { useAppDispatch } from "../../../app/store/appStore";
import { addTask, deleteColumn, editColumn } from "../../../shared/store/boardSlice";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

interface ColumnProps {
  column: TColumn;
}

const Column: FC<ColumnProps> = ({ column }) => {
  const { setDroppableNodeRef } = useSortable({ id: column.id, data: { type: "column" } });
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(column.title);

  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    dispatch(addTask({ columnId: column.id, title: "Test Task" }));
  };

  const handleDelete = () => {
    dispatch(deleteColumn({ columnId: column.id }));
  };

  const handleEdit = () => {
    const title = value.trim();

    if (title) {
      dispatch(editColumn({ columnId: column.id, title }));
      setValue(title);
    } else {
      setValue(column.title);
    }

    setIsEdit(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEdit();
  };

  return (
    <div className={style.Column}>
      <div className={style.Head}>
        <div className={style.Actions}>
          <button className={style.Button} onClick={() => setIsEdit((prev) => !prev)}>
            Edit
          </button>
          <button className={style.Button} onClick={handleDelete}>
            Delete
          </button>
          <button className={style.Button}>Drag</button>
        </div>
        {isEdit && (
          <form className={style.Edit} onSubmit={handleSubmit}>
            <input
              type="text"
              className={style.Input}
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleEdit}
            />
          </form>
        )}
        {!isEdit && <h2 className={style.Title}>{column.title}</h2>}
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
