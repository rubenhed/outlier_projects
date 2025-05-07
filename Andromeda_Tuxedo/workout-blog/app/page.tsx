'use client'

import { useState } from 'react';

type Workout = {
  exercise: string;
  reps: number;
  sets: number;
  startTime: string;
  endTime: string;
};

const WorkoutBlog = () => {
  const [exercise, setExercise] = useState('');
  const [reps, setReps] = useState<number>(1);
  const [sets, setSets] = useState<number>(1);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddWorkout = () => {
    if (exercise && reps && sets && startTime && endTime && endTime > startTime) {
      setWorkouts([
        ...workouts,
        { exercise, reps, sets, startTime, endTime },
      ]);
      setExercise('');
      setReps(1);
      setSets(1);
      setStartTime('');
      setEndTime('');
      setSuccessMessage('Workout added successfully!');
      setTimeout(() => {
        setSuccessMessage(''); // Clear the success message after 3 seconds
      }, 3000);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {successMessage && (
        <div className="absolute top-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg transition-opacity duration-300 opacity-100 animate-toast">
          {successMessage}
        </div>
      )}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Workout Blog</h1>
      <div className="flex flex-col mb-4">
        <label className="text-xl mb-2 text-gray-700">Exercise</label>
        <input
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="p-3 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-xl mb-2 text-gray-700">Reps</label>
        <input
          type="number"
          min={1}
          value={reps}
          onChange={(e) => setReps(Number(e.target.value))}
          className="p-3 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-xl mb-2 text-gray-700">Sets</label>
        <input
          type="number"
          min={1}
          value={sets}
          onChange={(e) => setSets(Number(e.target.value))}
          className="p-3 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
      <div className="flex mb-4 space-x-4">
        <div className="flex flex-col w-1/2">
          <label className="text-xl mb-2 text-gray-700">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="p-3 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-xl mb-2 text-gray-700">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="p-3 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </div>
      <button
        onClick={handleAddWorkout}
        className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg mt-4 cursor-pointer"
      >
        Add Workout
      </button>
      <div className="mt-10">
        <h2 className="text-2xl text-gray-700 mb-4">Workout Log</h2>
        <ul>
          {workouts.map((workout, index) => (
            <li key={index} className="mb-4 p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col">
                <span className="text-xl text-gray-800">{workout.exercise}</span>
                <span className="text-lg text-gray-700">
                  Reps times Sets: {workout.reps} * {workout.sets}
                </span>
                <span className="text-lg text-gray-700">
                  {workout.startTime} - {workout.endTime}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutBlog;
