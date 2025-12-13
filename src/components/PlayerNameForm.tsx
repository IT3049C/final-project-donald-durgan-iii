import { FormEvent } from "react";
import { usePlayer } from "../context/PlayerContext";

export function PlayerNameForm() {
  const { name, setName } = usePlayer();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="player-name-form">
      <label htmlFor="playerName">Player name</label>
      <input
        id="playerName"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter your name"
      />
    </form>
  );
}
