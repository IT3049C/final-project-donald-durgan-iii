import { Link, NavLink } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

export function Navbar() {
  const { name } = usePlayer();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-brand">
          Game Hub
        </Link>
        <NavLink to="/rps" className={linkClass}>
          Rock Paper Scissors
        </NavLink>
        <NavLink to="/tic-tac-toe" className={linkClass}>
          Tic Tac Toe
        </NavLink>
        <NavLink to="/wordle" className={linkClass}>
          Wordle
        </NavLink>
        <NavLink to="/memory" className={linkClass}>
          Memory
        </NavLink>
      </div>
      <div className="navbar-right">
        <span aria-label="Player name display">
          Player: {name || "Guest"}
        </span>
      </div>
    </nav>
  );
}
