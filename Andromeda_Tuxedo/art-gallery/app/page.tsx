"use client";

import { useState } from 'react';

interface Art {
  name: string;
  artForm: string;
  yearMade: number;
}

const App = () => {
  const [arts] = useState<Art[]>([
    { name: 'Mona Lisa', artForm: 'Painting', yearMade: 1503 },
    { name: 'The Starry Night', artForm: 'Painting', yearMade: 1889 },
    { name: 'The Scream', artForm: 'Painting', yearMade: 1893 },
    { name: 'The Thinker', artForm: 'Sculpture', yearMade: 1880 },
    { name: 'Girl with a Pearl Earring', artForm: 'Painting', yearMade: 1665 },
    { name: 'Guernica', artForm: 'Painting', yearMade: 1937 },
    { name: 'David', artForm: 'Sculpture', yearMade: 1504 },
    { name: 'The Persistence of Memory', artForm: 'Painting', yearMade: 1931 },
  ]);

  return (
    <div className="min-h-screen bg-[#fdf6f0] text-gray-800">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-900">Art Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {arts.map((art, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-md transition-transform ${index % 2 === 0 ? 'bg-pink-100' : 'bg-purple-100'}`}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-900">{art.name}</h2>
              <div className="inline-block bg-white/50 px-4 py-1 rounded-sm text-purple-800 text-sm shadow">
                <div>{art.artForm}</div>
                <div>{art.yearMade}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
