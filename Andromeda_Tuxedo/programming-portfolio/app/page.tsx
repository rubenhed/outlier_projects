"use client";

import { useState } from 'react';

export default function Portfolio() {
  const [projects] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce application with user authentication, product catalog, and checkout system.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A productivity application for organizing and tracking tasks with drag-and-drop functionality.",
      technologies: ["React", "TypeScript", "Redux", "Firebase"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Real-time weather information application with 5-day forecast and location search.",
      technologies: ["JavaScript", "OpenWeather API", "HTML/CSS"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description: "Dashboard for visualizing social media metrics and engagement data.",
      technologies: ["React", "Chart.js", "Python", "Django"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      id: 5,
      title: "Movie Recommendation Engine",
      description: "ML-powered recommendation system based on user preferences and viewing history.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Flask"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: "Mobile application for tracking workouts, nutrition, and progress over time.",
      technologies: ["React Native", "Expo", "Firebase"],
      githubUrl: "#",
      liveUrl: "#"
    }
  ]);

  const [filter, setFilter] = useState("all");

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(project => project.technologies.includes(filter));

  const techOptions = ["all", ...Array.from(new Set(projects.flatMap(p => p.technologies)))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">My Portfolio</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of my programming projects and contributions. Each project showcases different skills and technologies.
          </p>
        </header>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {techOptions.map(tech => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === tech
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
                }`}
            >
              {tech.charAt(0).toUpperCase() + tech.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-gray-200 dark:bg-gray-700 h-48 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                <div className="bg-gray-200 dark:bg-gray-600 border-2 border-dashed rounded-xl w-16 h-16" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 text-xs px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No projects found with the selected technology.</p>
            <button
              onClick={() => setFilter("all")}
              className="mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
}