import { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";

type Card = {
  id: number;
  value: string;
  matched: boolean;
};

const baseValues = ["A", "B", "C", "D", "E", "F"];

function createDeck(): Card[] {
  const cards: Card[] = [];
  let id = 0;
  for (const value of baseValues) {
    cards.push({ id: id++, value, matched: false });
    cards.push({ id: id++, value, matched: false });
  }
  // shuffle
  return cards.sort(() => Math.random() - 0.5);
}

export function Memory() {
  const { name } = usePlayer();
  const [cards, setCards] = useState<Card[]>(() => createDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      const [firstId, secondId] = flipped;
      const first = cards.find(c => c.id === firstId);
      const second = cards.find(c => c.id === secondId);

      if (!first || !second) return;
      setLock(true);

      if (first.value === second.value) {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstId || c.id === secondId
                ? { ...c, matched: true }
                : c
            )
          );
          setFlipped([]);
          setLock(false);
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLock(false);
        }, 700);
      }
    }
  }, [flipped, cards]);

  function handleFlip(id: number) {
    if (lock) return;
    if (flipped.includes(id)) return;

    const card = cards.find(c => c.id === id);
    if (!card || card.matched) return;

    setFlipped(prev =>
      prev.length === 0 ? [id] : prev.length === 1 ? [...prev, id] : prev
    );
  }

  function handleReset() {
    setCards(createDeck());
    setFlipped([]);
    setLock(false);
  }

  const allMatched = cards.every(c => c.matched);

  return (
    <div className="page game-page">
      <h1>Memory Cards</h1>
      <p>Player: {name || "Guest"}</p>

      <div className="memory-grid" aria-label="Memory cards">
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id) || card.matched;
          return (
            <button
              key={card.id}
              type="button"
              className="memory-card"
              onClick={() => handleFlip(card.id)}
              aria-label={`Card ${card.id}`}
            >
              {isFlipped ? card.value : "?"}
            </button>
          );
        })}
      </div>

      {allMatched && <p>You matched all cards!</p>}

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
