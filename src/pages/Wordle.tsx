import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";

type LetterResult = "correct" | "present" | "absent";

type GuessResult = {
  letters: { char: string; result: LetterResult }[];
};

const SECRET = "REACT"; // for demo only
const MAX_GUESSES = 6;

export function Wordle() {
  const { name } = usePlayer();
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [status, setStatus] = useState<string>("");

  function evaluateGuess(guess: string): GuessResult {
    const upperGuess = guess.toUpperCase();
    const secretChars = SECRET.split("");
    const result: GuessResult = {
      letters: upperGuess.split("").map((char, idx) => {
        if (char === secretChars[idx]) {
          return { char, result: "correct" };
        }
        if (secretChars.includes(char)) {
          return { char, result: "present" };
        }
        return { char, result: "absent" };
      })
    };
    return result;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (currentGuess.length !== 5) {
      setStatus("Guess must be 5 letters");
      return;
    }
    if (guesses.length >= MAX_GUESSES) return;

    const result = evaluateGuess(currentGuess);
    const nextGuesses = [...guesses, result];
    setGuesses(nextGuesses);
    setCurrentGuess("");
    setStatus("");

    const isWin = result.letters.every(l => l.result === "correct");
    if (isWin) setStatus("You guessed it!");
    else if (nextGuesses.length === MAX_GUESSES) setStatus(`Out of guesses. Word was ${SECRET}.`);
  }

  function handleReset() {
    setGuesses([]);
    setCurrentGuess("");
    setStatus("");
  }

  return (
    <div className="page game-page">
      <h1>Wordle (React)</h1>
      <p>Player: {name || "Guest"}</p>

      <form onSubmit={handleSubmit} className="wordle-form">
        <label htmlFor="wordleGuess">Enter guess</label>
        <input
          id="wordleGuess"
          value={currentGuess}
          onChange={e => setCurrentGuess(e.target.value.toUpperCase())}
          maxLength={5}
        />
        <button type="submit">Submit</button>
      </form>

      <div className="wordle-guesses">
        {guesses.map((guess, i) => (
          <div key={i} className="wordle-row">
            {guess.letters.map((l, j) => (
              <span
                key={j}
                className={`wordle-cell ${l.result}`}
              >
                {l.char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {status && <p className="wordle-status">{status}</p>}

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
