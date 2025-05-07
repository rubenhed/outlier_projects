"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type StudyEntry = {
  date: string;
  subject: string;
  hours: number;
};

const mockData: StudyEntry[] = [
  { date: "Apr 1", subject: "Math", hours: 1 },
  { date: "Apr 5", subject: "Science", hours: 2 },
  { date: "Apr 10", subject: "History", hours: 3 },
  { date: "Apr 15", subject: "Math", hours: 4 },
  { date: "Apr 20", subject: "Science", hours: 2 },
  { date: "Apr 25", subject: "Math", hours: 5 },
  { date: "May 1", subject: "History", hours: 6 },
];

type Page = "dashboard" | "subjects";
const subjectsList = Array.from(new Set(mockData.map((d) => d.subject)));

const Navbar = ({
  currentPage,
  setPage,
}: {
  currentPage: Page;
  setPage: (page: Page) => void;
}) => (
  <div className="md:w-64 bg-violet-50 border-r border-violet-100 shadow-sm p-6 md:block flex">
    <h1 className="text-2xl font-bold text-violet-600 md:mb-8 mr-4">
      Study Tracker
    </h1>
    <nav className="md:space-y-4 space-x-4 flex md:flex-col">
      {(["dashboard", "subjects"] as Page[]).map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`text-left px-2 py-1 rounded-lg transition font-medium ${currentPage === p
              ? "text-violet-600 bg-white shadow"
              : "text-stone-600 hover:text-violet-500 hover:bg-violet-100"
            }`}
        >
          {p.charAt(0).toUpperCase() + p.slice(1)}
        </button>
      ))}
    </nav>
  </div>
);

const Dashboard = () => {
  const totalHours = mockData.reduce((sum, d) => sum + d.hours, 0);
  const parseDate = (label: string) => new Date(`2025 ${label}`);

  const dateDiffInDays = (() => {
    const start = parseDate(mockData[0].date);
    const end = parseDate(mockData[mockData.length - 1].date);
    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(1, Math.round(diff));
  })();

  const averagePerDay = (totalHours / dateDiffInDays).toFixed(2);

  const dailyData = mockData.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.date] = (acc[entry.date] || 0) + entry.hours;
    return acc;
  }, {});
  const chartData = Object.entries(dailyData).map(([date, hours]) => ({
    date,
    hours,
  }));

  return (
    <div className="flex-1 p-6">
      <h2 className="text-3xl font-semibold mb-4 text-stone-800">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
          <p className="text-stone-500">Total Hours</p>
          <p className="text-3xl font-bold text-violet-600">{totalHours}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
          <p className="text-stone-500">Subjects</p>
          <p className="text-3xl font-bold text-violet-600">{subjectsList.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
          <p className="text-stone-500">Average/Day</p>
          <p className="text-3xl font-bold text-violet-600">{averagePerDay}h</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
        <h3 className="text-xl font-semibold mb-4 text-stone-700">
          Study Progress (Last Month)
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#7c3aed" />
              <YAxis unit="h" stroke="#7c3aed" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#8b5cf6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const Subjects = () => {
  const hoursPerSubject = mockData.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.subject] = (acc[entry.subject] || 0) + entry.hours;
    return acc;
  }, {});

  return (
    <div className="flex-1 p-6">
      <h2 className="text-3xl font-semibold mb-4 text-stone-800">Subjects</h2>
      <ul className="bg-white rounded-2xl shadow p-4 space-y-2 max-w-3xl">
        {subjectsList.map((subject) => (
          <li
            key={subject}
            className="border-b border-stone-200 last:border-0 py-2 text-lg flex justify-between"
          >
            <span className="text-stone-700">{subject}</span>
            <span className="text-violet-600 font-medium">
              {hoursPerSubject[subject]}h
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState<Page>("dashboard");

  let content;
  if (page === "dashboard") {
    content = <Dashboard />;
  } else if (page === "subjects") {
    content = <Subjects />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-stone-100 text-stone-800">
      <Navbar currentPage={page} setPage={setPage} />
      {content}
    </div>
  );
};

export default App;
