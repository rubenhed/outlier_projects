"use client"

import { useState, useEffect } from 'react';


interface ClickerDisplayProps {
  oranges: number;
  orangePerSecond: number;
  clickMultiplier: number;
  handleClick: () => void;
}

const ClickerDisplay = ({ oranges, orangePerSecond, clickMultiplier, handleClick }: ClickerDisplayProps) => {
  return (
    <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">{oranges.toFixed(1)} Oranges</h2>
        <p className="text-amber-600 dark:text-amber-300">{orangePerSecond.toFixed(1)} per second</p>
      </div>

      <div
        onClick={handleClick}
        className="mx-auto w-64 h-64 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-4 border-amber-700 shadow-2xl flex items-center justify-center cursor-pointer transform hover:scale-105 transition-transform active:scale-95"
      >
        <div className="text-center select-none">
          <span className="block text-white text-2xl font-bold">Click Me!</span>
          <span className="block text-white text-xs mt-2">+{clickMultiplier.toFixed(1)} per click</span>
        </div>
      </div>
    </div>
  );
};


interface Upgrade {
  id: number;
  name: string;
  cost: number;
  multiplier: number;
  purchased: boolean;
}

interface UpgradesPanelProps {
  upgrades: Upgrade[];
  oranges: number;
  buyUpgrade: (upgradeId: number) => void;
}

const UpgradesPanel = ({ upgrades, oranges, buyUpgrade }: UpgradesPanelProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Upgrades</h2>
      <div className="space-y-3">
        {upgrades.map(upgrade => (
          <div key={upgrade.id} className="flex justify-between items-center bg-amber-50 dark:bg-gray-700 rounded p-3">
            <div>
              <h3 className="font-medium">{upgrade.name}</h3>
              <p className="text-sm">Multiply click power by {upgrade.multiplier}x</p>
            </div>
            <button
              onClick={() => buyUpgrade(upgrade.id)}
              disabled={oranges < upgrade.cost || upgrade.purchased}
              className={`px-4 py-2 rounded font-medium ${upgrade.purchased
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                : oranges >= upgrade.cost
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
            >
              {upgrade.purchased ? 'Purchased' : `$${upgrade.cost}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


interface Building {
  id: number;
  name: string;
  cost: number;
  orangesPerSecond: number;
  amount: number;
}

interface BuildingsPanelProps {
  buildings: Building[];
  oranges: number;
  buyBuilding: (buildingId: number) => void;
}

const BuildingsPanel = ({ buildings, oranges, buyBuilding }: BuildingsPanelProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Buildings</h2>
      <div className="space-y-3">
        {buildings.map(building => (
          <div key={building.id} className="flex justify-between items-center bg-amber-50 dark:bg-gray-700 rounded p-3">
            <div>
              <h3 className="font-medium">{building.name} (x{building.amount})</h3>
              <p className="text-sm">{building.orangesPerSecond.toFixed(1)} oranges/sec each</p>
            </div>
            <button
              onClick={() => buyBuilding(building.id)}
              disabled={oranges < building.cost}
              className={`px-4 py-2 rounded font-medium ${oranges >= building.cost
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
            >
              ${building.cost.toFixed(0)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


const OrangeClickerIdle = () => {
  const [oranges, setOranges] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [orangePerSecond, setOrangePerSecond] = useState(0);
  const [upgrades, setUpgrades] = useState([
    { id: 1, name: 'Bigger Fingers', cost: 10, multiplier: 1.5, purchased: false },
    { id: 2, name: 'Vitamin C Boost', cost: 50, multiplier: 2, purchased: false },
    { id: 3, name: 'Juice Machine', cost: 200, multiplier: 2.5, purchased: false },
  ]);
  const [buildings, setBuildings] = useState([
    { id: 1, name: 'Tree', cost: 15, orangesPerSecond: 0.2, amount: 0 },
    { id: 2, name: 'Orchard', cost: 100, orangesPerSecond: 1, amount: 0 },
    { id: 3, name: 'Farm', cost: 500, orangesPerSecond: 5, amount: 0 },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const totalOrangesPerSecond = buildings.reduce(
        (sum, building) => sum + building.amount * building.orangesPerSecond,
        0
      );
      setOrangePerSecond(totalOrangesPerSecond);

      if (totalOrangesPerSecond > 0) {
        setOranges(prev => prev + totalOrangesPerSecond / 10);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [buildings]);

  const handleClick = () => {
    setOranges(prev => prev + clickMultiplier);
  };

  const buyUpgrade = (upgradeId: number) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || oranges < upgrade.cost || upgrade.purchased) return;

    setOranges(prev => prev - upgrade.cost);
    setUpgrades(prev =>
      prev.map(u =>
        u.id === upgradeId ? { ...u, purchased: true } : u
      )
    );

    setClickMultiplier(prev => prev * upgrade.multiplier);
  };

  const buyBuilding = (buildingId: number) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building || oranges < building.cost) return;

    setOranges(prev => prev - building.cost);
    setBuildings(prev =>
      prev.map(b =>
        b.id === buildingId
          ? { ...b, amount: b.amount + 1, cost: Math.floor(b.cost * 1.15) }
          : b
      )
    );
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-gray-900 text-amber-900 dark:text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Orange Clicker</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <ClickerDisplay
            oranges={oranges}
            orangePerSecond={orangePerSecond}
            clickMultiplier={clickMultiplier}
            handleClick={handleClick}
          />
          <div className="flex-1 space-y-6">
            <UpgradesPanel
              upgrades={upgrades}
              oranges={oranges}
              buyUpgrade={buyUpgrade}
            />
            <BuildingsPanel
              buildings={buildings}
              oranges={oranges}
              buyBuilding={buyBuilding}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrangeClickerIdle;
