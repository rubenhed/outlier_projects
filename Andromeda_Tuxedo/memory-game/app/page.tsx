'use client';

import { useEffect, useState } from 'react';

const ROWS = 6;
const TILE_COUNT = ROWS**2;
const PAIR_COUNT = TILE_COUNT / 2;

type Tile = {
  id: number;
  value: number;
  matched: boolean;
};

const App = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const values = [...Array(PAIR_COUNT).keys()].flatMap((v) => [v, v]);
    const shuffled = values
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({ id: index, value, matched: false }));

    setTiles(shuffled);
  }, []);

  const handleClick = (index: number) => {
    if (disabled || flipped.includes(index) || tiles[index].matched) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [first, second] = newFlipped;
      const firstTile = tiles[first];
      const secondTile = tiles[second];

      if (firstTile.value === secondTile.value) {
        setTiles((prev) =>
          prev.map((tile) =>
            tile.value === firstTile.value ? { ...tile, matched: true } : tile
          )
        );
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const values = [...Array(PAIR_COUNT).keys()].flatMap((v) => [v, v]);
    const shuffled = values
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({ id: index, value, matched: false }));

    setTiles(shuffled);
    setFlipped([]);
    setDisabled(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Memory Game</h1>

      <div className={`grid grid-cols-6 gap-2`}>
        {tiles.map((tile, index) => {
          const isFlipped = flipped.includes(index) || tile.matched;
          return (
            <button
              key={tile.id}
              onClick={() => handleClick(index)}
              className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-md font-bold transition
                ${
                  isFlipped
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
            >
              {isFlipped ? tile.value : '?'}
            </button>
          );
        })}
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded"
      >
        Reset Game
      </button>
    </div>
  );
}

export default App;