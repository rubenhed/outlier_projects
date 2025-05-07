'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type FoodEntry = {
  id: number;
  food: string;
  calories: number;
  time: string;
};

const App = () => {
  const [food, setFood] = useState<string>('');
  const [calories, setCalories] = useState<number>(0);
  const [time, setTime] = useState<string>('');
  const [entries, setEntries] = useState<FoodEntry[]>([]);

  const entriesByTime = () => {
    return entries.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
  }

  const addEntry = () => {
    if (!food || !calories || !time) return;

    setEntries(prev => [
      ...prev,
      { id: Date.now(), food, calories, time },
    ]);

    setFood('');
    setCalories(0);
    setTime('');
  };

  const groupByDay = () => {
    const now = new Date();

    const firstWeekDay = new Date(now.setDate(now.getDate() - now.getDay()));
    firstWeekDay.setHours(0, 0, 0, 0);

    const result: { [date: string]: number } = {};

    const weekDates: string[] = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(firstWeekDay);
      day.setDate(firstWeekDay.getDate() + i);
      const formattedDate = day.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
      result[formattedDate] = 0;
      weekDates.push(formattedDate);
    }

    entries.forEach(entry => {
      const entryDate = new Date(entry.time);
      const formattedEntryDate = entryDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

      if (result[formattedEntryDate] !== undefined) {
        result[formattedEntryDate] += entry.calories;
      }
    });

    return weekDates.map(day => ({
      day,
      calories: result[day],
    }));
  };

  return (
    <div className="min-h-screen p-8 bg-amber-50 dark:bg-amber-900">
      <div className="container transition-colors duration-300 mx-auto max-w-[900px]">


        <h1 className="text-3xl font-bold mb-6 text-center text-amber-800 dark:text-amber-200">Calorie Tracker</h1>

        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Food"
              className="border p-2 rounded bg-white dark:bg-amber-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600"
              value={food}
              onChange={e => setFood(e.target.value)}
            />
            <input
              type="number"
              placeholder="Calories (Kcal)"
              className="border p-2 rounded bg-white dark:bg-amber-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600"
              min="0"
              value={calories || ''}
              onChange={e => setCalories(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              type="datetime-local"
              className="border p-2 rounded bg-white dark:bg-amber-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600"
              value={time}
              onChange={e => setTime(e.target.value)}
            />
            <div className="flex justify-start items-center">
              <button
                className="bg-amber-800 text-white dark:bg-amber-200 dark:text-amber-800 p-2 rounded hover:bg-amber-700 dark:hover:bg-amber-300 w-full cursor-pointer"
                onClick={addEntry}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-amber-800 dark:text-amber-200">Entries</h2>
          {entries.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No entries yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {entriesByTime().map(entry => {
                const dateObj = new Date(entry.time);
                const date = dateObj.toLocaleDateString();
                const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                  <div key={entry.id} className="border p-3 rounded bg-white dark:bg-amber-700 dark:text-white">
                    <div className="font-semibold">{entry.food} - {entry.calories} kcal</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">{date} at {time}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-amber-800 dark:text-amber-200">Weekly Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={groupByDay()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tickMargin={10} />
              <YAxis tickMargin={10} />
              <Tooltip />
              <Line type="monotone" dataKey="calories" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
