import { useState } from "react";
import Board from "./Board";
import Record from "./Record";

function Chess() {
  const [nextType, setNextType] = useState("X");
  const [record, setRecord] = useState([
    {
      info: "GO to Gmae Start",
      board: JSON.stringify([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]),
    },
  ]);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [isHistory, setIsHistory] = useState(0);
  const [historyIndex, setHistoryIndex] = useState(0);
  const onclick = (index1, index2) => {
    if (winner()) {
      return;
    }
    if (board[index1][index2] !== "") {
      return;
    }
    board[index1][index2] = nextType;
    setBoard(board);
    if (isHistory) {
      record.splice(historyIndex);
    }
    record.push({
      info: `MOVE TO #${record.length}`,
      board: JSON.stringify(board),
    });
    setIsHistory(0);
    setRecord(record);
    setNextType(nextType === "X" ? "O" : "X");
  };

  const onRecordClick = (index) => {
    setBoard(JSON.parse(record[index].board));
    setIsHistory(1);
    setHistoryIndex(index + 1);
  };

  const winner = () => {
    let isOver;
    board.forEach((item, index) => {
      item.forEach((cell, i) => {
        if (board[index][i]) {
          if (
            index === 2 &&
            board[index][i] === board[index - 1][i] &&
            board[index][i] === board[index - 2][i]
          ) {
            isOver = true;
          }
          if (
            i === 2 &&
            board[index][i] === board[index][i - 1] &&
            board[index][i] === board[index][i - 2]
          ) {
            isOver = true;
          }

          if (
            i === 2 &&
            index === 2 &&
            board[index][i] === board[index - 1][i - 1] &&
            board[index][i] === board[index - 2][i - 2]
          ) {
            isOver = true;
          }

          if (
            i === 0 &&
            index === 2 &&
            board[index][i] === board[index - 1][i + 1] &&
            board[index][i] === board[index - 2][i + 2]
          ) {
            isOver = true;
          }
        }
      });
    });
    return isOver;
  };
  console.log(winner(), "winner");
  return (
    <div>
      <div>
        Next player: {nextType}
        <Board board={board} onclick={onclick}></Board>
      </div>
      <Record record={record} onRecordClick={onRecordClick}></Record>
    </div>
  );
}

export default Chess;
