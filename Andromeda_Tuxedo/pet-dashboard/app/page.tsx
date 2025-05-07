'use client'

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface Pet {
  id: number;
  type: string;
  name: string;
  age: number;
  weight: number;
  activeHours: number[];
}

const PetDashboard = () => {
  const [pets, setPets] = useState<Pet[]>([
    { id: 1, type: 'Cat', name: 'Whiskers', age: 3, weight: 10, activeHours: [2, 4, 1, 3, 2, 1, 2] },
    { id: 2, type: 'Dog', name: 'Buddy', age: 2, weight: 20, activeHours: [3, 2, 4, 1, 3, 2, 1] },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Pet Dashboard</h1>
      <div className="w-full max-w-4xl">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {pet.name} the {pet.type}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <p className="text-lg text-gray-600"><strong>Age:</strong> {pet.age} years</p>
                <p className="text-lg text-gray-600"><strong>Weight:</strong> {pet.weight} lbs</p>
              </div>
            </div>
            <div className="w-full" style={{ height: 300 }}>
              <ResponsiveContainer>
                <LineChart
                  data={pet.activeHours.map((hours, i) => ({ day: `Day ${i + 1}`, hours }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis label={{ value: 'Exercise Hours', angle: -90, position: 'insideLeft', offset: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#4c51bf" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetDashboard;

