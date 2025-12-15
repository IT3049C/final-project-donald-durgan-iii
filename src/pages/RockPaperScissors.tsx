import { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import {
  createRoom,
  joinRoom,
  subscribeToRoom,
  sendMove,
  RpsRoomState,
  RpsMove
} from "../Multiplayer/rpsMultiplayer";

export function RockPaperScissors() {
  const { name } = usePlayer();

  // Multiplayer state
  const [roomId, setRoomId] = useState<string>("");
  const [roomState, setRoomState] = useState<RpsRoomState | null>(null);
  const [joinInput, setJoinInput] = useState("");

  // Local UI state for single-player fallback
  const [playerMove, setPlayerMove] = useState<RpsMove>(null);
  const [cpuMove, setCpuMove] = useState<RpsMove>(null);
  const [result, setResult] = useState("");

  // Subscribe to room updates
  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = subscribeToRoom(roomId, (state) => {
      setRoomState(state);
    });

    return () => unsubscribe();
  }, [roomId]);

  // Create Room
  async function handleCreateRoom() {
    const room = await createRoom(name || "Player");
    setRoomId(room.roomId);
    setRoomState(room);
  }

  // Join Room
  async function handleJoinRoom() {
    if (!joinInput.trim()) return;
    const room = await joinRoom(joinInput.trim(), name || "Guest");
    setRoomId(room.roomId);
    setRoomState(room);
  }

  // Send Move
  async function handleSendMove(move: RpsMove) {
    if (!roomState) return;

    const player = roomState.players.find((p) => p.name === name);
    if (!player) return;

    await sendMove(roomState.roomId, player.id, move);
  }

  // Single-player fallback logic
  function handleSinglePlayer(move: RpsMove) {
    const cpu: RpsMove = ["rock", "paper", "scissors"][
      Math.floor(Math.random() * 3)
    ] as RpsMove;

    setPlayerMove(move);
    setCpuMove(cpu);

    if (move === cpu) setResult("draw");
    else if (
      (move === "rock" && cpu === "scissors") ||
      (move === "paper" && cpu === "rock") ||
      (move === "scissors" && cpu === "paper")
    ) {
      setResult("win");
    } else {
      setResult("lose");
    }
  }

  return (
    <div className="page game-page">
      <h1>Rock Paper Scissors</h1>
      <p>Player: {name || "Guest"}</p>

      {/* ✅ Multiplayer Controls */}
      <section>
        <h2>Multiplayer</h2>

        <button
          type="button"
          onClick={handleCreateRoom}
          aria-label="Create Room"
        >
          Create Room
        </button>

        <div>
          <label htmlFor="joinRoomInput">Room ID</label>
          <input
            id="joinRoomInput"
            aria-label="Room ID"
            value={joinInput}
            onChange={(e) => setJoinInput(e.target.value)}
          />
          <button
            type="button"
            onClick={handleJoinRoom}
            aria-label="Join Room"
          >
            Join Room
          </button>
        </div>

        {/* ✅ Room Info */}
        {roomState && (
          <div className="room-info">
            <p>
              Room:{" "}
              <span data-testid="room-id">{roomState.roomId}</span>
            </p>

            <div data-testid="player-list">
              <h3>Players</h3>
              {roomState.players.map((p) => (
                <div key={p.id}>{p.name}</div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ✅ Multiplayer Move Buttons */}
      {roomState && (
        <section>
          <h2>Make Your Move</h2>
          <button
            type="button"
            aria-label="Rock"
            onClick={() => handleSendMove("rock")}
          >
            Rock
          </button>
          <button
            type="button"
            aria-label="Paper"
            onClick={() => handleSendMove("paper")}
          >
            Paper
          </button>
          <button
            type="button"
            aria-label="Scissors"
            onClick={() => handleSendMove("scissors")}
          >
            Scissors
          </button>

          {/* ✅ Result Display */}
          <div data-testid="result">
            {roomState.winnerId
              ? `Winner: ${
                  roomState.players.find(
                    (p) => p.id === roomState.winnerId
                  )?.name
                }`
              : "Waiting for moves..."}
          </div>
        </section>
      )}

      <hr />

      {/* ✅ Single-player fallback */}
      {!roomState && (
        <section>
          <h2>Single Player Mode</h2>

          <button
            type="button"
            aria-label="Play rock"
            onClick={() => handleSinglePlayer("rock")}
          >
            Rock
          </button>
          <button
            type="button"
            aria-label="Play paper"
            onClick={() => handleSinglePlayer("paper")}
          >
            Paper
          </button>
          <button
            type="button"
            aria-label="Play scissors"
            onClick={() => handleSinglePlayer("scissors")}
          >
            Scissors
          </button>

          <p>Player move: {playerMove ?? "-"}</p>
          <p>CPU move: {cpuMove ?? "-"}</p>
          {result && <p>Result: {result}</p>}
        </section>
      )}
    </div>
  );
}
