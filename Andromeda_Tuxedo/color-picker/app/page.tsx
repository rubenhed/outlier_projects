'use client'

import { useState } from 'react'

type Palette = {
  name: string
  colors: string[]
}

const palettes: Palette[] = [
  { name: 'Sunset', colors: ['#ff9a8b', '#ff6a88', '#ff99ac'] },
  { name: 'Ocean', colors: ['#0077b6', '#00b4d8', '#90e0ef'] },
  { name: 'Forest', colors: ['#2a9d8f', '#264653', '#e9c46a'] },
  { name: 'Monochrome', colors: ['#111827', '#4b5563', '#9ca3af'] },
  { name: 'Candy', colors: ['#ff4d6d', '#f9c74f', '#90be6d'] }
]

const App = () => {
  const [selected, setSelected] = useState<Palette>(palettes[0])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/80 dark:bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-6 text-center tracking-tight">
          🎨 Pick a Color Palette
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {palettes.map((palette) => (
            <button
              key={palette.name}
              onClick={() => setSelected(palette)}
              className={`group rounded-2xl p-1 border-2 transition-all duration-200 ${
                selected.name === palette.name
                  ? 'border-blue-600 ring-2 ring-blue-300 dark:ring-blue-500 shadow-lg scale-105'
                  : 'border-gray-300 dark:border-gray-600 hover:shadow-md hover:scale-[1.02]'
              }`}
            >
              <div className="flex h-16 rounded-xl overflow-hidden">
                {palette.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 transition-all"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-center text-sm mt-2 font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {palette.name}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-3">
            Selected: <span className="text-blue-600 dark:text-blue-400">{selected.name}</span>
          </h2>
          <div className="flex h-12 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600 shadow-inner">
            {selected.colors.map((color, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
