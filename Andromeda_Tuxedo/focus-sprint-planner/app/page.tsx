"use client";

import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

interface Task {
  id: number;
  name: string;
  energyLevel: "low" | "medium" | "high";
  completed?: boolean;
  reflection?: string;
}

export default function FocusSprintPlanner() {
  const [mode, setMode] = useState("light");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Write blog", energyLevel: "medium" },
    { id: 2, name: "Design mockup", energyLevel: "high" },
  ]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [reflection, setReflection] = useState("");
  const [completedSprints, setCompletedSprints] = useState<Task[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isRunning && time > 0) {
        setTime((prev) => prev - 1);
      } else if (isRunning && time === 0) {
        setIsRunning(false);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const handleStartSprint = (task: Task) => {
    setCurrentTask(task);
    setTime(25 * 60);
    setIsRunning(true);
  };

  const handleStopSprint = () => {
    setIsRunning(false);
    setCurrentTask(null);
  };

  const handleSaveReflection = () => {
    if (currentTask) {
      const updated = { ...currentTask, reflection };
      setCompletedSprints((prev) => [...prev, updated]);
      setReflection("");
      setCurrentTask(null);
    }
  };

  const toggleMode = () => setMode(mode === "light" ? "dark" : "light");

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const percentage = (time / (25 * 60)) * 283;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 p-4 ${
        mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <header className="flex justify-between items-center max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Focus Sprint Planner</h1>
        <button
          onClick={toggleMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle Dark Mode"
        >
          {mode === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </header>

      <main className="max-w-3xl mx-auto mt-8">
        {!currentTask ? (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Select a Task</h2>
            <div className="space-y-2">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  className="w-full p-3 rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  onClick={() => handleStartSprint(task)}
                >
                  {task.name} ({task.energyLevel})
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Current Task: {currentTask.name}</h2>
            <p className="mb-4">Energy Level: {currentTask.energyLevel}</p>

            <svg className="w-32 h-32 mx-auto mb-4" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                strokeWidth="10"
                fill="none"
                className="stroke-gray-300 dark:stroke-gray-700"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                strokeWidth="10"
                fill="none"
                className="stroke-blue-500"
                strokeDasharray="283"
                strokeDashoffset={283 - percentage}
                strokeLinecap="round"
              />
            </svg>

            <div className="text-center text-3xl font-mono mb-4">{formatTime(time)}</div>

            <div className="flex justify-center space-x-4">
              {isRunning ? (
                <button className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition" onClick={handleStopSprint}>Stop</button>
              ) : (
                <button className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition" onClick={() => setIsRunning(true)}>Start</button>
              )}
            </div>
          </section>
        )}

        {!isRunning && currentTask && time === 0 && (
          <section className="mt-6">
            <h3 className="text-lg font-medium mb-2">Reflection</h3>
            <textarea
              className="w-full h-28 p-3 bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-900 rounded border border-gray-300 dark:border-gray-600"
              placeholder="How did it go?"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
            />
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition" onClick={handleSaveReflection}>Save Reflection</button>
          </section>
        )}

        {completedSprints.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Completed Sprints</h2>
            <ul className="space-y-3">
              {completedSprints.map((task, i) => (
                <li key={i} className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
                  <strong>{task.name}</strong> ({task.energyLevel})
                  {task.reflection && (
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      Reflection: {task.reflection}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
