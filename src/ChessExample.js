import { useState } from "react";
import "./style.css";

export default function Game() {
  const [history, setHistory] = useState([
    {
      position: [],
      squares: Array(9).fill(null),
    },
  ]);
  const [curMove, setCurMove] = useState(0);
  const [sortType, setSortType] = useState(0);
  let curSquares = history[curMove].squares;
  const xIsNext = curMove % 2 === 0;
  function handlePlay(position, nextSquares) {
    const nextHistory = [
      ...history.slice(0),
      {
        position: position.slice(0),
        squares: nextSquares,
      },
    ];
    setHistory(nextHistory);
    setCurMove(nextHistory.length - 1);
  }

  function jumpTo(index) {
    curSquares = history[index].squares;
    setCurMove(index);
  }
  function handleChangeSortType() {
    setSortType(!!sortType ? 0 : 1);
  }

  const moves = history.map((item, move) => {
    let desc;
    if (move > 0) {
      desc =
        "GO to move #" +
        move +
        "position " +
        "col" +
        item.position[0] +
        " " +
        "row" +
        item.position[1];
    } else {
      desc = "Go to game start";
    }
    return (
      <li key={move}>
        <button
          onClick={() => {
            jumpTo(move);
          }}
        >
          {desc}
        </button>
      </li>
    );
  });

  const curMoves = sortType ? moves.slice().reverse() : moves;
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} onPlay={handlePlay} squares={curSquares} />
      </div>
      <div className="game-info">
        <button onClick={handleChangeSortType}>切换排序</button>
        <ol>{curMoves}</ol>
      </div>
    </div>
  );
}
function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    let position = [parseInt(i / 3), i % 3];
    onPlay(position, nextSquares);
  }

  let status;
  if (winner) {
    status = "Winner：" + winner;
  } else {
    console.log(squares,'ssss')
    if (squares.includes(null)) {
      status = "Next Player:" + (xIsNext ? "X" : "O");
    } else {
      status = "平局";
    }
  }
  const SquareMap = Array(3).fill(Array(3).fill(""));
  return (
    <>
      <div className="status">{status}</div>
      {SquareMap.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Square
              key={rowIndex * 3 + cellIndex}
              value={squares[rowIndex * 3 + cellIndex]}
              onSquareClick={() => {
                handleClick(rowIndex * 3 + cellIndex);
              }}
              highLight={winner && winner.includes(rowIndex * 3 + cellIndex)}
            ></Square>
          ))}
        </div>
      ))}
    </>
  );
}

function Square({ value, onSquareClick, highLight }) {
  return (
    <button
      className={["square", highLight ? "high-light" : ""].join(" ")}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}
