'use client'

import { useState, useEffect } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(15);
  const [grid, setGrid] = useState(Array(6).fill(null).map(() => Array(6).fill(null)));
  const [hints, setHints] = useState(3);
  const [highScore, setHighScore] = useState(0);
  const [selectedTile, setSelectedTile] = useState('purple');
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [topScores, setTopScores] = useState([
    { score: 150, name: 'Galaxy Master' },
    { score: 120, name: 'Star Voyager' },
    { score: 90, name: 'Cosmic Explorer' },
  ]);
  const [isDarkMode, setIsDarkMode] = useState(false);


  const tileColors = ['purple', 'teal', 'indigo', 'pink'];


  useEffect(() => {
    const storedHighScore = localStorage.getItem('cosmicPuzzleHighScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore));
    }

    const storedScores = localStorage.getItem('cosmicPuzzleTopScores');
    if (storedScores) {
      setTopScores(JSON.parse(storedScores));
    }
  }, []);


  const initializeGrid = () => {
    const newGrid = Array(6).fill(null).map(() => Array(6).fill(null));

    for (let i = 0; i < 5; i++) {
      const x = Math.floor(Math.random() * 6);
      const y = Math.floor(Math.random() * 6);
      const color = tileColors[Math.floor(Math.random() * tileColors.length)];
      newGrid[x][y] = color;
    }
    return newGrid;
  };

  const handleStartGame = () => {
    setCurrentPage('game');
    setScore(0);
    setMoves(15);
    setHints(3);
    setGrid(initializeGrid());
    setGameOver(false);
  };

  const handlePlaceTile = (x: number, y: number) => {
    if (grid[x][y] !== null || moves <= 0 || gameOver) return;

    const newGrid = [...grid];
    newGrid[x][y] = selectedTile;
    setGrid(newGrid);

    const pointsEarned = checkPatterns(newGrid, x, y);
    setScore(score + pointsEarned);
    setMoves(moves - 1);

    if (moves <= 1) {
      handleGameEnd(score + pointsEarned);
    }
  };

  const checkPatterns = (grid: (string | null)[][], x: number, y: number) => {
    let points = 0;
    const color = grid[x][y];


    let horizontalCount = 1;

    let i = y - 1;
    while (i >= 0 && grid[x][i] === color) {
      horizontalCount++;
      i--;
    }

    i = y + 1;
    while (i < 6 && grid[x][i] === color) {
      horizontalCount++;
      i++;
    }


    let verticalCount = 1;

    i = x - 1;
    while (i >= 0 && grid[i][y] === color) {
      verticalCount++;
      i--;
    }

    i = x + 1;
    while (i < 6 && grid[i][y] === color) {
      verticalCount++;
      i++;
    }


    let diagonalCount1 = 1;

    let dx = x - 1;
    let dy = y - 1;
    while (dx >= 0 && dy >= 0 && grid[dx][dy] === color) {
      diagonalCount1++;
      dx--;
      dy--;
    }

    dx = x + 1;
    dy = y + 1;
    while (dx < 6 && dy < 6 && grid[dx][dy] === color) {
      diagonalCount1++;
      dx++;
      dy++;
    }


    let diagonalCount2 = 1;

    dx = x - 1;
    dy = y + 1;
    while (dx >= 0 && dy < 6 && grid[dx][dy] === color) {
      diagonalCount2++;
      dx--;
      dy++;
    }

    dx = x + 1;
    dy = y - 1;
    while (dx < 6 && dy >= 0 && grid[dx][dy] === color) {
      diagonalCount2++;
      dx++;
      dy--;
    }

    if (horizontalCount >= 3) points += horizontalCount * 5;
    if (verticalCount >= 3) points += verticalCount * 5;
    if (diagonalCount1 >= 3) points += diagonalCount1 * 10;
    if (diagonalCount2 >= 3) points += diagonalCount2 * 10;

    return points;
  };

  const handleHint = () => {
    if (hints <= 0 || gameOver) return;

    let bestMove = { x: 0, y: 0, points: 0, color: '' };

    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        if (grid[x][y] === null) {
          for (const color of tileColors) {
            const tempGrid = JSON.parse(JSON.stringify(grid));
            tempGrid[x][y] = color;
            const points = checkPatterns(tempGrid, x, y);

            if (points > bestMove.points) {
              bestMove = { x, y, color, points };
            }
          }
        }
      }
    }


    const newGrid = [...grid];
    newGrid[bestMove.x][bestMove.y] = 'hint';
    setGrid(newGrid);
    setHints(hints - 1);

    setTimeout(() => {
      const resetGrid = [...newGrid];
      resetGrid[bestMove.x][bestMove.y] = null;
      setGrid(resetGrid);
    }, 2000);
  };

  const handleGameEnd = (finalScore: number) => {
    setGameOver(true);


    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('cosmicPuzzleHighScore', finalScore.toString());
    }
  };

  const handleSaveScore = () => {
    if (!playerName.trim()) return;

    const newScores = [...topScores, { name: playerName, score }];
    newScores.sort((a, b) => b.score - a.score);
    const updatedScores = newScores.slice(0, 10); // Keep only top 10

    setTopScores(updatedScores);
    localStorage.setItem('cosmicPuzzleTopScores', JSON.stringify(updatedScores));
    setCurrentPage('leaderboard');
  };

  const handleSelectTile = (color: string) => {
    setSelectedTile(color);
  };

  const darkModeButton = () => (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg"
    >
      {isDarkMode ? '🌙' : '🌞'}
    </button>
  );


  const colorMap: { [key: string]: string } = {
    purple: 'bg-purple-500 hover:bg-purple-600',
    teal: 'bg-teal-500 hover:bg-teal-600',
    indigo: 'bg-indigo-500 hover:bg-indigo-600',
    pink: 'bg-pink-500 hover:bg-pink-600',
    hint: 'bg-yellow-300 animate-pulse',
    null: 'bg-gray-800 hover:bg-gray-700'
  };

  if (currentPage === 'home') {
    return (
      <div className={`h-screen w-screen flex justify-center items-center ${isDarkMode ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-gradient-to-r from-indigo-200 to-purple-200'} overflow-auto`}>
        {darkModeButton()}
        <div className="text-center max-w-2xl p-8 bg-gray-900 bg-opacity-50 rounded-xl backdrop-blur-sm shadow-2xl">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-teal-400 mb-6">
            Cosmic Patterns
          </h1>
          <div className="flex justify-center mb-8">
            {tileColors.map((color, index) => (
              <div key={index} className={`w-8 h-8 mx-1 rounded-full ${colorMap[color]}`}></div>
            ))}
          </div>
          <p className="text-xl text-gray-200 mb-8">
            Connect cosmic tiles in patterns of 3 or more to earn points. Create diagonal patterns for bonus points. Can you become the galaxy's greatest puzzle master?
          </p>
          <button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-xl transform transition hover:scale-105 shadow-lg"
            onClick={handleStartGame}
          >
            Start Cosmic Journey
          </button>
          <button
            className="bg-transparent border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900 font-bold py-2 px-6 rounded-full mt-4 ml-4 text-lg transition"
            onClick={() => setCurrentPage('leaderboard')}
          >
            Leaderboard
          </button>
        </div>
      </div>
    );
  } else if (currentPage === 'game') {
    return (
      <div className={`min-h-screen w-screen flex flex-col items-center ${isDarkMode ? 'bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-b from-gray-100 via-purple-100 to-indigo-100'} p-4 overflow-auto`}>
        {darkModeButton()}
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-teal-400 mb-6">
          Cosmic Patterns
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full max-w-6xl">
          <div className="w-full md:w-64 bg-gray-900 bg-opacity-70 rounded-xl p-6 backdrop-blur-sm shadow-lg">
            <div className="mb-6">
              <p className="text-lg text-gray-300 mb-2">Score</p>
              <p className="text-3xl font-bold text-teal-400">{score}</p>
            </div>
            <div className="mb-6">
              <p className="text-lg text-gray-300 mb-2">Moves Left</p>
              <p className="text-3xl font-bold text-pink-400">{moves}</p>
            </div>
            <div className="mb-6">
              <p className="text-lg text-gray-300 mb-2">Hints</p>
              <div className="flex">
                {[...Array(hints)].map((_, i) => (
                  <div key={i} className="w-6 h-6 mr-1 bg-yellow-400 rounded-full"></div>
                ))}
                {[...Array(3 - hints)].map((_, i) => (
                  <div key={i} className="w-6 h-6 mr-1 bg-gray-700 rounded-full"></div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-lg text-gray-300 mb-2">Selected Tile</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {tileColors.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full ${colorMap[color]} ${selectedTile === color ? 'ring-2 ring-white transform scale-110' : ''}`}
                    onClick={() => handleSelectTile(color)}
                  ></button>
                ))}
              </div>
            </div>
            <button
              className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 ${hints > 0 ? 'hover:from-yellow-600 hover:to-yellow-700' : 'opacity-50 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded-lg mb-4`}
              onClick={handleHint}
              disabled={hints <= 0}
            >
              Use Hint
            </button>
            <button
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => setCurrentPage('home')}
            >
              Exit Game
            </button>
          </div>
          <div className="flex justify-center items-center">
            <div className="inline-grid grid-cols-6 gap-4 bg-gray-900 bg-opacity-70 md:p-6 p-4 lg:p-6 rounded-xl backdrop-blur-sm shadow-lg mx-auto">
              {grid.map((row, x) => (
                row.map((tile, y) => (
                  <div
                    key={`${x}-${y}`}
                    className={`aspect-square w-12 h-12 md:w-16 md:h-16 rounded-lg cursor-pointer 
              border border-gray-700 transform transition-all duration-200 
              hover:scale-105 ${colorMap[tile] || colorMap.null}`}
                    onClick={() => handlePlaceTile(x, y)}
                  >
                    {tile === 'hint' && (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-900 font-bold">!</span>
                      </div>
                    )}
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>
  
        {gameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-purple-500 rounded-xl p-8 max-w-md w-full shadow-2xl">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-teal-400 mb-4">
                Game Over!
              </h2>
              <p className="text-xl text-gray-200 mb-4">
                Your cosmic score: <span className="text-teal-400 font-bold">{score}</span>
              </p>
              {score > highScore && (
                <p className="text-lg text-pink-400 mb-6">New high score! Congratulations!</p>
              )}
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Enter your name:</label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="Cosmic Explorer"
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={handleSaveScore}
                >
                  Save Score
                </button>
                <button
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={handleStartGame}
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else if (currentPage === 'leaderboard') {
    return (
      <div className={`min-h-screen w-screen flex justify-center items-center ${isDarkMode ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-gradient-to-r from-indigo-200 to-purple-200'} p-4 overflow-auto`}>
        {darkModeButton()}
        <div className="text-center max-w-md w-full bg-gray-900 bg-opacity-70 rounded-xl p-8 backdrop-blur-sm shadow-2xl">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-teal-400 mb-6">
            Cosmic Leaderboard
          </h1>

          {topScores.length > 0 ? (
            <div className="mb-8">
              <div className="flex justify-between mb-2 font-bold text-gray-400 border-b border-gray-800 pb-2">
                <span>Rank</span>
                <span>Player Name</span>
                <span>Score</span>
              </div>
              <ul>
                {topScores.map((score, index) => (
                  <li key={index} className="flex justify-between text-lg text-gray-200 py-2 border-b border-gray-800">
                    <span className={index < 3 ? "text-yellow-400 font-bold" : "text-gray-400"}>#{index + 1}</span>
                    <span>{score.name}</span>
                    <span className="text-teal-400 font-bold">{score.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-400 mb-8">No high scores yet. Will you be the first?</p>
          )}

          <div className="flex justify-center gap-4">
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full transform transition hover:scale-105"
              onClick={handleStartGame}
            >
              Play Game
            </button>
            <button
              className="bg-transparent border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900 font-bold py-2 px-6 rounded-full transition"
              onClick={() => setCurrentPage('home')}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default App;