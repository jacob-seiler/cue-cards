import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Deck {
  id: string;
  title: string;
  colour: string;
}

const generateHex = () => {
  // 20 options for saturation
  const cells = 20;
  const h = Math.floor(Math.random() * (360 / cells + 1)) * cells;

  // Fixed saturation and lightness
  const s = 65;
  const l = 60 / 100;

  // Convert HSL to HEX
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };

  return `#${f(0)}${f(8)}${f(4)}`;
};

const App = () => {
  const [decks, setDecks] = useState<Deck[]>([]);

  // Load decks from local storage
  useEffect(() => {
    setDecks(JSON.parse(localStorage.getItem("decks") ?? JSON.stringify([])));
  }, []);

  const handleAdd = () => {
    const newDeck = {
      id: uuidv4(),
      title: "New Deck",
      colour: generateHex(),
    };

    setDecks((prev) => {
      const newDecks = [...prev, newDeck];
      localStorage.setItem("decks", JSON.stringify(newDecks));

      return newDecks;
    });
  };

  return (
    <main>
      <h1>Welcome section!</h1>
      <hr />
      {!decks ? (
        <p>You don&apos;t have any decks!</p>
      ) : (
        decks.map((deck) => (
          <div
            key={deck.id}
            className="w-60 h-32"
            style={{ backgroundColor: deck.colour }}
          >
            <p>{deck.title}</p>
          </div>
        ))
      )}
      <button onClick={handleAdd}>Add Deck</button>
    </main>
  );
};

export default App;
