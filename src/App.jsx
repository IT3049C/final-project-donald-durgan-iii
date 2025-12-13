import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Hub } from "./Pages/Hub";
import { RockPaperScissors } from "./Pages/RockPaperScissors";
import { TicTacToe } from "./Pages/TicTacToe";
import { Wordle } from "./Pages/Wordle";
import { Memory } from "./Pages/Memory";

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
