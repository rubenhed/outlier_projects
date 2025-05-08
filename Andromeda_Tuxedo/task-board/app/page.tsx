"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Type definition for each task
type Task = {
  id: string; // Unique identifier for the task
  content: string; // Task description
  done: boolean; // Whether the task is completed
  createdAt: Date; // Timestamp when the task was created
};

// Define initial tasks as a constant
const initialTasks: Task[] = [
  {
    id: uuidv4(),
    content: "Go for a 20-minute walk",
    done: false,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    content: "Pick up groceries from the market",
    done: false,
    createdAt: new Date(),
  },
];

export default function TaskDrift() {
  // State to manage dark mode
  const [darkMode, setDarkMode] = useState(typeof window !== "undefined" && localStorage.getItem("darkMode") === "true");

  // Effect to save the dark mode preference in local storage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // State to manage the list of tasks
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // State to manage the input field for adding new tasks
  const [input, setInput] = useState<string>("");

  // Clear all tasks every 24 hours
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks([]); // Clear tasks
    }, 86400000); // 24 hours in milliseconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (!input.trim()) return; // Prevent adding empty tasks
    const task: Task = {
      id: uuidv4(), // Generate a unique ID for the task
      content: input, // Use the input value as the task content
      done: false, // Mark the task as not done
      createdAt: new Date(), // Set the current timestamp
    };
    setTasks([task, ...tasks]); // Add the new task to the top of the list
    setInput(""); // Clear the input field
  };

  // Function to toggle the "done" state of a task
  const toggleDone = (id: string) => {
    setTasks(
      tasks.map(
        (task) => (task.id === id ? { ...task, done: !task.done } : task) // Toggle the "done" state
      )
    );
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${darkMode
        ? "bg-gray-900 text-white"
        : "bg-gradient-to-br from-white to-gray-100 text-gray-900"
        } ${inter.className}`}
    >
      <div className="max-w-xl mx-auto">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4 align-center gap-2">
          <div className="flex items-center">
            <span
              className={`ml-3 text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Toggle {darkMode ? "Light" : "Dark"} Mode
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)} // Toggle dark mode
            />
            <div className={`w-11 h-6 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer peer-checked:bg-teal-600 transition-all duration-300 
              ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border rounded-full shadow-md transform peer-checked:translate-x-5 transition-all duration-300"></div>
          </label>
        </div>

        {/* App Title */}
        <h1 className="text-4xl font-bold text-center text-teal-700 mb-6">
          TaskDrift
        </h1>

        {/* App Description */}
        <p
          className={`text-center mb-4 transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-500"
            }`}
        >
          Quick tasks that clear themselves daily.
        </p>

        {/* Input Field for Adding Tasks */}
        <div className="flex gap-2 mb-6">
          <input
            className={`flex-grow border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors duration-300 ${darkMode
              ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600"
              : "bg-white text-gray-900 placeholder-gray-500 border-teal-300"
              }`}
            placeholder="Add a quick task..."
            value={input}
            onChange={(e) => setInput(e.target.value)} // Update input state
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent form submission
                handleAddTask(); // Add the task
              }
            }}
          />
          <button
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 cursor-pointer transition-colors duration-300"
            onClick={handleAddTask} // Add the task on button click
          >
            Add
          </button>
        </div>

        {/* Today's Tasks Section */}
        <div>
          <h2
            className={`text-xl font-semibold tracking-wide mb-2 border-b pb-1 ${darkMode ? "border-gray-700" : "border-gray-300"
              }`}
          >
            Today&apos;s Tasks
          </h2>
          <ul className="space-y-3">
            <AnimatePresence>
              {/* Show message if no tasks are left */}
              {tasks.filter((t) => !t.done).length === 0 && (
                <motion.li
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-center py-4 italic text-sm md:text-lg ${darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  No tasks left for today. You&apos;re all caught up! 🎉
                </motion.li>
              )}
              {/* Render each task */}
              {tasks
                .filter((t) => !t.done)
                .map((task) => (
                  <motion.li
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.2 }}
                    className={`rounded p-3 shadow flex justify-between items-center transition-colors duration-300 text-sm md:text-lg ${darkMode
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-900"
                      }`}
                  >
                    <span className="w-40 md:w-[20rem]">{task.content}</span>
                    <button
                      onClick={() => toggleDone(task.id)} // Mark task as done
                      className={`flex items-center gap-1 md:text-base px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer 
    ${darkMode
                          ? "bg-green-700 text-white hover:bg-green-600"
                          : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                    >
                      ✅ Mark done
                    </button>
                  </motion.li>
                ))}
            </AnimatePresence>
          </ul>
        </div>

        {/* Completed Tasks Section */}
        {tasks.some((t) => t.done) && (
          <div className="mt-8">
            <h2
              className={`text-xl font-semibold tracking-wide mb-2 border-b pb-1 ${darkMode ? "border-gray-700" : "border-gray-300"
                }`}
            >
              Completed Today
            </h2>
            <ul className="space-y-3">
              <AnimatePresence>
                {tasks
                  .filter((t) => t.done)
                  .map((task) => (
                    <motion.li
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className={`border-l-4 rounded p-3 shadow transition-colors duration-300 text-sm md:text-lg ${darkMode
                        ? "bg-green-900 text-green-100 border-green-600"
                        : "bg-green-50 text-green-800 border-green-400"
                        }`}
                    >
                      <span className="inline-flex items-center gap-2 text-xs md:text-base ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {task.content}
                      </span>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}