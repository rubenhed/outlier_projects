'use client';

import { useState } from 'react';

type Flashcard = {
  id: number;
  question: string;
  answer: string;
};

const flashcards: Flashcard[] = [
  { id: 1, question: 'What is the capital of Japan?', answer: 'Tokyo' },
  { id: 2, question: 'What is 5 + 5?', answer: '10' },
  { id: 3, question: 'What is 3 x 3?', answer: '9' },
];

const App = () => {
  const [cards, setCards] = useState<Flashcard[]>(flashcards);
  const [index, setIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<Boolean>(false);

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-900 dark:to-gray-800">
        <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-200">You're all done! 🎉</h1>
      </div>
    );
  }

  const knowIt = () => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
    setShowAnswer(false);
    setIndex(0);
  };

  const showAgain = () => {
    const newCards = [...cards];
    const card = newCards.splice(index, 1)[0];
    newCards.push(card);
    setCards(newCards);
    setShowAnswer(false);
    setIndex(0);
  };

  const currentCard = cards[index];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-900 dark:to-gray-800 transition-colors">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border-4 border-blue-200 dark:border-gray-700 transition-colors">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300">Flashcard</h2>
        <div className="text-2xl mb-8 text-blue-900 dark:text-gray-200">
          {showAnswer ? currentCard.answer : currentCard.question}
        </div>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 dark:hover:bg-blue-400 transition transform hover:scale-105"
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
        </div>
        {showAnswer && (
          <div className="flex justify-between">
            <button
              onClick={showAgain}
              className="px-5 py-3 bg-yellow-400 text-white font-semibold rounded-xl hover:bg-yellow-500 transition w-1/2 mr-2 transform hover:scale-105 dark:bg-yellow-500 dark:hover:bg-yellow-400"
            >
              Show Again
            </button>
            <button
              onClick={knowIt}
              className="px-5 py-3 bg-green-400 text-white font-semibold rounded-xl hover:bg-green-500 transition w-1/2 ml-2 transform hover:scale-105 dark:bg-green-500 dark:hover:bg-green-400"
            >
              I Know It
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
