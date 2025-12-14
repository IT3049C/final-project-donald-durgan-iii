import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Hub } from "./pages/Hub";
import { RockPaperScissors } from "./pages/RockPaperScissors";
import { TicTacToe } from "./pages/TicTacToe";
import { Wordle } from "./pages/Wordle";
import { Memory } from "./pages/Memory";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Hub />} />
        <Route path="/rps" element={<RockPaperScissors />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/wordle" element={<Wordle />} />
        <Route path="/memory" element={<Memory />} />
      </Route>
    </Routes>
  );
}

export default App;
