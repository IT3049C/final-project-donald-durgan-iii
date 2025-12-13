import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";

type Move = "rock" | "paper" | "scissors";

const moves: Move[] = ["rock", "paper", "scissors"];

function getResult(player: Move, cpu: Move): "win" | "lose" | "draw" {
  if (player === cpu) return "draw";
  if (
    (player === "rock" && cpu === "scissors") ||
    (player === "paper" && cpu === "rock") ||
    (player === "scissors" && cpu === "paper")
  ) {
    return "win";
  }
  return "lose";
}

export function RockPaperScissors() {
  const { name } = usePlayer();
  const [playerMove, setPlayerMove] = useState<Move | null>(null);
  const [cpuMove, setCpuMove] = useState<Move | null>(null);
  const [result, setResult] = useState<string>("");

  function handlePlay(move: Move) {
    const cpu = moves[Math.floor(Math.random() * moves.length)];
    setPlayerMove(move);
    setCpuMove(cpu);
    setResult(getResult(move, cpu));
  }

  function handleReset() {
    setPlayerMove(null);
    setCpuMove(null);
    setResult("");
  }

  return (
    <div className="page game-page">
      <h1>Rock Paper Scissors</h1>
      <p>Player: {name || "Guest"}</p>

      <div className="rps-controls">
        <p>Choose your move:</p>
        <div className="buttons">
          <button
            type="button"
            onClick={() => handlePlay("rock")}
            aria-label="Play rock"
          >
            Rock
          </button>
          <button
            type="button"
            onClick={() => handlePlay("paper")}
            aria-label="Play paper"
          >
            Paper
          </button>
          <button
            type="button"
            onClick={() => handlePlay("scissors")}
            aria-label="Play scissors"
          >
            Scissors
          </button>
        </div>
      </div>

      <div className="rps-state">
        <p>Player move: {playerMove ?? "-"}</p>
        <p>CPU move: {cpuMove ?? "-"}</p>
        {result && <p>Result: {result}</p>}
      </div>

      <button
        type="button"
        onClick={handleReset}
        aria-label="Reset game"
      >
        Reset
      </button>

      <hr />

      <section>
        <h2>Multiplayer (Room API placeholder)</h2>
        <p>
          This section is where you integrate the course room API for real
          multiplayer.
        </p>
      </section>
    </div>
  );
}
