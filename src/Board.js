import "./board.css";

function Board({ board, onclick }) {
  console.log(board, "board");
  return (
    <div className="board">
      {board.map((item, i) => (
        <div className="row" key={i}>
          {item.map((cell, n) => (
            <div
              className="cell"
              onClick={() => {
                onclick(i, n);
              }}
              key={i + "" + n}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
export default Board;
