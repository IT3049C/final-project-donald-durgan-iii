import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";

type PlayerMark = "X" | "O" | null;

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function calculateWinner(squares: PlayerMark[]): PlayerMark {
  for (const [a, b, c] of winningLines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export function TicTacToe() {
  const { name } = usePlayer();
  const [squares, setSquares] = useState<PlayerMark[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  function handleClick(index: number) {
    if (winner || squares[index]) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status = `Next player: ${xIsNext ? "X" : "O"}`;
  if (winner) status = `Winner: ${winner}`;
  else if (isDraw) status = "Draw";

  return (
    <div className="page game-page">
      <h1>Tic Tac Toe</h1>
      <p>Player: {name || "Guest"}</p>

      <div className="ttt-status">{status}</div>
      <div
        className="ttt-board"
        role="grid"
        aria-label="Tic Tac Toe board"
      >
        {squares.map((value, i) => (
          <button
            key={i}
            type="button"
            className="ttt-square"
            onClick={() => handleClick(i)}
            aria-label={`Square ${i + 1}`}
          >
            {value}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleReset}
        aria-label="Reset game"
      >
        Reset
      </button>
    </div>
  );
}
