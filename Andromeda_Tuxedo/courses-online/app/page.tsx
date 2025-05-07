"use client";

import { useState, useEffect } from "react";

type Course = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "React course",
    description: "Learn React.",
    price: "$49",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
  },
  {
    id: 2,
    title: "Next.js course",
    description: "Learn Next.js.",
    price: "$69",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/1280px-Nextjs-logo.svg.png",
  },
  {
    id: 3,
    title: "Tailwind course",
    description: "Learn Tailwind.",
    price: "$39",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tailwind_CSS_logo.svg/2560px-Tailwind_CSS_logo.svg.png",
  },
];

const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-3 rounded shadow-md animate-fade-in">
      {message}
    </div>
  );
};

const Header = () => (
  <div className="bg-white dark:bg-gray-800">
    <div className="container mx-auto flex justify-between items-center shadow-md py-4 px-6">
      <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Courses Online</h1>
      <div className="space-x-4">
        <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Home</a>
        <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Courses</a>
        <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">About</a>
      </div>
    </div>
  </div>
);

const Hero = () => (
  <section className="bg-indigo-600 text-white py-20 px-6 text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-4">Learn popular frameworks</h2>
    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
      Browse our top-rated courses.
    </p>
    <a
      href="#courses"
      className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
    >
      Browse Courses
    </a>
  </section>
);

const CourseCard = ({
  course,
  onBuy,
}: {
  course: Course;
  onBuy: (course: Course) => void;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
    <img src={course.image} alt={course.title} className="w-full h-48 object-contain p-3" />
    <div className="p-6">
      <h4 className="text-xl font-semibold mb-2">{course.title}</h4>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{course.price}</span>
        <button
          onClick={() => onBuy(course)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
);

const CourseList = ({ onBuy }: { onBuy: (course: Course) => void }) => (
  <div id="courses" className="py-16 px-6 bg-gray-50 dark:bg-gray-900 flex-1">
    <h3 className="text-3xl font-bold text-center mb-12">Courses</h3>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onBuy={onBuy} />
      ))}
    </div>
  </div>
);

const Footer = () => (
  <div className="bg-white dark:bg-gray-800 py-6 px-6 text-center border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
    © 2025 Courses Online. All rights reserved.
  </div>
);

const App = () => {
  const [toast, setToast] = useState<string | null>(null);

  const onBuy = (course: Course) => {
    setToast(`Thanks for buying ${course.title} for ${course.price}!`);
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 relative">
      <Header />
      <Hero />
      <CourseList onBuy={onBuy} />
      <Footer />
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;