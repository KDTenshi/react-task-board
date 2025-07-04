import { useState, type FC } from "react";
import style from "./Board.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { Column } from "../../Column";
import { addColumn } from "../../../shared/store/boardSlice";

const Board: FC = () => {
  const columns = useAppSelector((state) => state.board.columns);

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

  return (
    <div className={style.Board}>
      {columns.map((column) => (
        <Column column={column} key={column.id} />
      ))}
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
