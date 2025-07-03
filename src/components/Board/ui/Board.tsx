import type { FC } from "react";
import style from "./Board.module.css";
import { useAppSelector } from "../../../app/store/appStore";
import { Column } from "../../Column";

const Board: FC = () => {
  const columns = useAppSelector((state) => state.board.columns);

  return (
    <div className={style.Board}>
      {columns.map((column) => (
        <Column column={column} />
      ))}
    </div>
  );
};

export default Board;
