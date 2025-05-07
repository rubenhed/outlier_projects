"use client";

import { useState } from "react";

type Step = {
  id: number;
  text: string;
};

type StepInput = {
  [key: number]: string;
};

type Goal = {
  id: number;
  title: string;
  steps: Step[];
};

const App = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<string>("");
  const [stepInputs, setStepInputs] = useState<StepInput>({});

  const addGoal = () => {
    if (!newGoal.trim()) return;
    const goal: Goal = {
      id: Date.now(),
      title: newGoal.trim(),
      steps: [],
    };
    setGoals((prev) => [...prev, goal]);
    setNewGoal("");
  };

  const addStep = (goalId: number) => {
    const text = stepInputs[goalId]?.trim();
    if (!text) return;

    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
            ...goal,
            steps: [...goal.steps, { id: Date.now(), text }],
          }
          : goal
      )
    );
    setStepInputs((prev) => ({ ...prev, [goalId]: "" }));
  };

  const deleteGoal = (goalId: number) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
  };

  const deleteStep = (goalId: number, stepId: number) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? { ...goal, steps: goal.steps.filter((s) => s.id !== stepId) }
          : goal
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-4">🛠 Code Manager</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
            placeholder="Add a goal..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addGoal()}
          />
          <button
            onClick={addGoal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Goal
          </button>
        </div>

        {goals.map((goal) => (
          <div
            key={goal.id}
            className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">{goal.title}</h2>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete Goal
              </button>
            </div>

            <ul className="list-disc pl-5 space-y-1">
              {goal.steps.map((step) => (
                <div className="flex" key={step.id}>
                  <li className="mr-auto">
                    {step.text}
                  </li>
                  <button
                    onClick={() => deleteStep(goal.id, step.id)}
                    className="text-xs text-gray-500 hover:text-red-500 ml-4"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </ul>

            <div className="mt-3 flex gap-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                placeholder="Add a step..."
                value={stepInputs[goal.id] || ""}
                onChange={(e) =>
                  setStepInputs((prev) => ({ ...prev, [goal.id]: e.target.value }))
                }
                onKeyDown={(e) => e.key === "Enter" && addStep(goal.id)}
              />
              <button
                onClick={() => addStep(goal.id)}
                className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
              >
                Add Step
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;