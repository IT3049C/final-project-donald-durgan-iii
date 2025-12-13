import { Link } from "react-router-dom";
import { PlayerNameForm } from "../components/PlayerNameForm";

export function Hub() {
  return (
    <div className="page hub-page">
      <h1>Universal Game Hub</h1>
      <p>Developer: Donald Durgan III</p>

      <section>
        <h2>Player Setup</h2>
        <PlayerNameForm />
      </section>

      <section>
        <h2>Available Games</h2>
        <ul>
          <li>
            <Link to="/rps">Rock Paper Scissors</Link>
          </li>
          <li>
            <Link to="/tic-tac-toe">Tic Tac Toe</Link>
          </li>
          <li>
            <Link to="/wordle">Wordle</Link>
          </li>
          <li>
            <Link to="/memory">Memory</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
