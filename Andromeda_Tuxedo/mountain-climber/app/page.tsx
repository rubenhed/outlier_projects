'use client';

import { useState } from 'react';
import { LucideMountain } from 'lucide-react';

type Mountain = {
  id: number;
  name: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  height: number;
};

const mountains: Mountain[] = [
  { id: 1, name: 'Mount Fuji', difficulty: 'Moderate', height: 3776 },
  { id: 2, name: 'Mount Everest', difficulty: 'Hard', height: 8848 },
  { id: 3, name: 'Kilimanjaro', difficulty: 'Moderate', height: 5895 },
  { id: 4, name: 'Ben Nevis', difficulty: 'Easy', height: 1345 },
];

const Navbar = () => (
  <div className='dark:bg-gray-800 bg-white'>
    <nav className="p-4 container mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-white">
        <LucideMountain className="text-green-600" />
        Climber
      </div>
      <p className="text-gray-600 dark:text-gray-300">Let's climb mountains!</p>
    </nav>
  </div>
);

const Sidebar = ({
  id,
  setid,
}: {
  id: number;
  setid: (id: number) => void;
}) => (
  <div className="w-64 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 space-y-4">
    <h2 className="text-lg font-bold mb-2">Mountains</h2>
    <nav className="space-y-2">
      {mountains.map((mountain) => (
        <button
          key={mountain.id}
          className={`w-full text-left p-2 rounded transition ${id === mountain.id
              ? 'bg-gray-300 dark:bg-gray-700'
              : 'hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          onClick={() => setid(mountain.id)}
        >
          {mountain.name}
        </button>
      ))}
    </nav>
  </div>
);

const MountainExplorer = () => {
  const [id, setId] = useState<number>(1);
  const selectedMountain = mountains.find((m) => m.id === id);

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar id={id} setid={setId} />
        <main className="flex-1 p-6 overflow-y-auto text-gray-800 dark:text-gray-100">
          {selectedMountain ? (
            <div className="bg-white dark:bg-gray-800 shadow rounded p-6 max-w-md">
              <h2 className="text-2xl font-semibold mb-4">{selectedMountain.name}</h2>
              <p>
                <strong>Difficulty:</strong> {selectedMountain.difficulty}
              </p>
              <p>
                <strong>Height:</strong> {selectedMountain.height} m
              </p>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">Select a mountain to see details</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default MountainExplorer;
