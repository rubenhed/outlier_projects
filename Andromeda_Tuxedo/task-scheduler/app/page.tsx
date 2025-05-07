"use client"

import { useState } from 'react'

type Comment = {
  id: number
  text: string
}

type Task = {
  id: number
  date: string
  reason: string
  goal: string
  comments: Comment[]
  title: string
}

const TaskForm = ({ onAddTask }: { onAddTask: (task: { title: string; reason: string; goal: string; date: string }) => void }) => {
  const [formData, setFormData] = useState({ title: '', reason: '', goal: '', date: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { title, reason, goal, date } = formData
    if (title && reason && goal && date) {
      onAddTask(formData)
      setFormData({ title: '', reason: '', goal: '', date: '' })
    }
  }

  return (
    <div id="add-task" className="bg-white dark:bg-gray-800 p-6 shadow-xl rounded-xl max-w-4xl mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-wide text-center">Add a task</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['title', 'reason', 'goal'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">{field}</label>
              <input
                type="text"
                id={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                placeholder={`Enter the ${field}`}
                className="mt-2 p-3 w-full border rounded-xl shadow-sm focus:ring-2 focus:ring-pink-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Date</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-2 p-3 w-full border rounded-xl shadow-sm focus:ring-2 focus:ring-pink-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full bg-pink-300 hover:bg-pink-400 text-white p-3 rounded-xl transition duration-300 dark:bg-pink-400 dark:hover:bg-pink-500"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const TaskList = ({ tasks, onAddComment }: { tasks: Task[], onAddComment: (taskId: number, commentText: string) => void }) => {
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({})

  const handleCommentChange = (taskId: number, value: string) => {
    setNewComments((prev) => ({ ...prev, [taskId]: value }))
  }

  const handleAddComment = (taskId: number) => {
    if (newComments[taskId]?.trim()) {
      onAddComment(taskId, newComments[taskId])
      setNewComments((prev) => ({ ...prev, [taskId]: '' }))
    }
  }

  return (
    <div id="tasks" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow w-full">
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{task.title}</h3>
            <p className="text-gray-700 dark:text-gray-300"><strong className="font-medium">Date:</strong> {task.date}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong className="font-medium">Reason:</strong> {task.reason}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong className="font-medium">Goal:</strong> {task.goal}</p>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Comments</h4>
            {task.comments.length > 0 ? (
              <div className="space-y-3 mt-3">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm text-gray-700 dark:text-gray-300">
                    {comment.text}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic dark:text-gray-400">No comments yet</p>
            )}
            <div className="mt-4">
              <textarea
                className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={newComments[task.id] || ''}
                onChange={(e) => handleCommentChange(task.id, e.target.value)}
                placeholder="Add a comment"
                rows={3}
              />
              <button
                onClick={() => handleAddComment(task.id)}
                className="mt-3 w-full bg-pink-300 hover:bg-pink-400 text-white p-3 rounded-xl transition duration-300 dark:bg-pink-400 dark:hover:bg-pink-500"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const Navbar = () => {
  return (
    <nav className="bg-pink-300 dark:bg-pink-400 text-white p-4 fixed w-full top-0 left-0 z-20 opacity-80">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="text-2xl font-bold">TaskScheduler</div>
        <div className="space-x-6">
          <a href="#" className="hover:text-pink-100">Home</a>
          <a href="#tasks" className="hover:text-pink-100">Tasks</a>
          <a href="#add-task" className="hover:text-pink-100">Add Task</a>
        </div>
      </div>
    </nav>
  )
}

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-screen-xl mx-auto text-center">
        <p className="text-sm">© 2025 TaskScheduler. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [nextId, setNextId] = useState(1)

  const handleAddTask = (task: { date: string; reason: string; goal: string; title: string }) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...task, id: nextId, comments: [] }
    ])
    setNextId((prev) => prev + 1)
  }

  const handleAddComment = (taskId: number, commentText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, comments: [...task.comments, { id: task.comments.length + 1, text: commentText }] }
          : task
      )
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 flex-grow pt-24">
        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onAddComment={handleAddComment} />
      </div>
      <Footer />
    </div>
  )
}

export default App
