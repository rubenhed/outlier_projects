"use client"

import { useState, useEffect } from "react"

interface Upgrade {
  name: string
  description: string
  baseCost: number
  effect: number
  type: "click" | "auto"
  level: number
  multiplier: number
}

const initUpgrades: Upgrade[] = [
  {
    name: "Juicer",
    description: "Squeeze more juice per click",
    baseCost: 10,
    effect: 1,
    type: "click",
    level: 0,
    multiplier: 1.15,
  },
  {
    name: "Peeler",
    description: "Auto-peel oranges for extra juice",
    baseCost: 50,
    effect: 1,
    type: "auto",
    level: 0,
    multiplier: 1.15,
  },
  {
    name: "Squeezer",
    description: "Increases auto-juicer efficiency",
    baseCost: 100,
    effect: 2,
    type: "auto",
    level: 0,
    multiplier: 1.15,
  },
  {
    name: "Orange Tree",
    description: "Plants a tree that grows oranges",
    baseCost: 500,
    effect: 3,
    type: "auto",
    level: 0,
    multiplier: 1.15,
  },
  {
    name: "Juice Extractor",
    description: "Extracts juice automatically",
    baseCost: 1000,
    effect: 5,
    type: "auto",
    level: 0,
    multiplier: 1.15,
  },
]

const OrangeClicker = () => {
  const [points, setPoints] = useState(0)
  const [upgrades, setUpgrades] = useState(initUpgrades)
  const [pointsPerClick, setPointsPerClick] = useState(1)
  const [autoPointsPerSecond, setAutoPointsPerSecond] = useState(0)
  const [showUpgrades, setShowUpgrades] = useState(false)
  const [selectedUpgrade, setSelectedUpgrade] = useState<string | null>(null)
  const [clickAnimation, setClickAnimation] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prevPoints) => prevPoints + autoPointsPerSecond)
    }, 1000)

    return () => clearInterval(interval)
  }, [autoPointsPerSecond])

  useEffect(() => {
    let clickTotal = 0
    let autoTotal = 0

    upgrades.forEach((upgrade) => {
      if (upgrade.type === "click") {
        clickTotal += upgrade.effect * upgrade.level
      } else {
        autoTotal += upgrade.effect * upgrade.level
      }
    })

    setPointsPerClick(1 + clickTotal)
    setAutoPointsPerSecond(autoTotal)
  }, [upgrades])

  const handleUpgradePurchase = (index: number) => {
    const upgrade = upgrades[index]
    const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.multiplier, upgrade.level))

    if (points >= cost) {
      setPoints((prevPoints) => prevPoints - cost)

      setUpgrades((prevUpgrades) =>
        prevUpgrades.map((u, i) =>
          i === index
            ? {
                ...u,
                level: u.level + 1,
                baseCost: Math.floor(u.baseCost * Math.pow(u.multiplier, u.level)),
              }
            : u
        )
      )
    }
  }

  const handleMouseOver = (index: number) => {
    const upgrade = upgrades[index]
    setSelectedUpgrade(upgrade.name)
  }

  const handleMouseLeave = () => {
    setSelectedUpgrade(null)
  }

  const handleOrangeClick = () => {
    setClickAnimation(true)
    setTimeout(() => setClickAnimation(false), 50)
    setPoints((prevPoints) => prevPoints + pointsPerClick)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    const orange = document.getElementById("orange")

    if (orange) {
      const rect = orange.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top

      const distance = Math.sqrt(Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2))

      if (distance <= rect.width / 2) {
        setClickAnimation(true)
        setTimeout(() => setClickAnimation(false), 200)

        setPoints((prevPoints) => prevPoints + pointsPerClick)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-950 flex flex-col items-center justify-center p-4 text-gray-900 dark:text-orange-100">

      <div className="w-full max-w-4xl">
      <h1 className="text-5xl font-bold mb-8 text-center text-orange-800 dark:text-orange-300">Orange Clicker</h1>


        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8">
          <div
            className="relative flex flex-col items-center"
            onTouchStart={handleTouchStart}
          >
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div
                id="orange"
                className={`w-48 h-48 rounded-full bg-orange-500 flex items-center justify-center text-5xl font-bold text-white cursor-pointer transition-transform duration-200 select-none ${
                  clickAnimation ? "scale-90" : "scale-100"
                }`}
                onClick={handleOrangeClick}
              >
                <span className="drop-shadow-md">🍊</span>
              </div>
            </div>

          </div>

          <div className="flex flex-col items-center md:items-start gap-6 w-full md:w-1/2">
            <div className="p-6 bg-white rounded-lg shadow-lg w-full">
              <h2 className="text-2xl font-bold text-orange-700 mb-4">Stats</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-orange-600 text-sm font-medium">Total Juice</p>
                  <p className="text-3xl font-bold text-orange-800">{Math.floor(points)}</p>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-orange-600 text-sm font-medium">Juice / Click</p>
                  <p className="text-3xl font-bold text-orange-800">{pointsPerClick}</p>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-orange-600 text-sm font-medium">Auto Juice</p>
                  <p className="text-3xl font-bold text-orange-800">{autoPointsPerSecond.toFixed(1)}/s</p>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-orange-600 text-sm font-medium">Value</p>
                  <p className="text-3xl font-bold text-orange-800">${(points * 0.1).toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="w-full">
              <button
                className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md"
                onClick={() => setShowUpgrades(!showUpgrades)}
              >
                <span>{showUpgrades ? "Hide Upgrades" : "Show Upgrades"}</span>
                <svg
                  className={`w-5 h-5 ml-2 transition-transform duration-200 ${showUpgrades ? "transform rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {showUpgrades && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upgrades.map((upgrade, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg shadow-md transition-all duration-200 border-2 ${
                        selectedUpgrade === upgrade.name ? "border-orange-600 bg-orange-50" : "border-transparent bg-white"
                      }`}
                      onMouseOver={() => handleMouseOver(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-orange-700">{upgrade.name}</h3>
                        <span className="text-sm font-medium text-orange-600">Level {upgrade.level}</span>
                      </div>

                      <div className="flex flex-col justify-between min-h-[110px]">
                        <p className="text-sm text-gray-600">{upgrade.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-orange-600 font-bold">
                            {upgrade.type === "click" ? `+${upgrade.effect} juice per click` : `+${upgrade.effect} juice per second`}
                          </span>
                          <button
                            className={`py-1 px-3 rounded-lg text-white font-medium transition-colors duration-200 ${
                              points >= Math.floor(upgrade.baseCost * Math.pow(upgrade.multiplier, upgrade.level))
                                ? "bg-orange-600 hover:bg-orange-700"
                                : "bg-gray-300 cursor-not-allowed"
                            }`}
                            onClick={() => handleUpgradePurchase(index)}
                            disabled={points < Math.floor(upgrade.baseCost * Math.pow(upgrade.multiplier, upgrade.level))}
                          >
                            Buy for{" "}
                            {Math.floor(upgrade.baseCost * Math.pow(upgrade.multiplier, upgrade.level)).toLocaleString()}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrangeClicker
// Zod Schema
export const Schema = {
    "commentary": "This is a simple cookie clicker game where the player earns points by clicking on an orange. The player can then use these points to purchase upgrades, such as increasing the points earned per click or simulating clicks every few seconds.",
    "template": "nextjs-developer",
    "title": "Orange Clicker",
    "description": "A simple cookie clicker game where the player earns points by clicking on an orange.",
    "additional_dependencies": [],
    "has_additional_dependencies": false,
    "install_dependencies_command": "",
    "port": 3000,
    "file_path": "app/page.tsx",
    "code": "<see code above>"
}