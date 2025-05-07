"use client"

import { useState } from "react";

const Home = () => {
  const [sockets, setSockets] = useState<number | string>("");
  const [str, setStr] = useState<number | string>("");
  const [dex, setDex] = useState<number | string>("");
  const [int, setInt] = useState<number | string>("");
  const [red, setRed] = useState<number | string>("");
  const [green, setGreen] = useState<number | string>("");
  const [blue, setBlue] = useState<number | string>("");

  const [results, setResults] = useState<any[]>([]);

  const handleCalculation = () => {
    if (
      !sockets ||
      !str ||
      !dex ||
      !int ||
      !red ||
      !green ||
      !blue
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const totalSockets = Number(sockets);
    const requiredStrength = Number(str);
    const requiredDexterity = Number(dex);
    const requiredIntelligence = Number(int);

    const redCount = Number(red);
    const greenCount = Number(green);
    const blueCount = Number(blue);

    const totalColorSlots = redCount + greenCount + blueCount;
    const totalRequired = requiredStrength + requiredDexterity + requiredIntelligence;
    const successChance = (totalRequired / 100) * (totalColorSlots / totalSockets);
    const averageCost = totalSockets * 5; 
    const averageAttempts = successChance > 0 ? 1 / successChance : 0;
    const costPerTry = averageCost / averageAttempts;
    const stdDeviation = 2; 

    setResults([
      {
        craftType: "Chromatic Crafting",
        avgCost: averageCost.toFixed(2),
        successChance: (successChance * 100).toFixed(2) + "%",
        avgAttempts: averageAttempts.toFixed(2),
        costPerTry: costPerTry.toFixed(2),
        stdDeviation: stdDeviation.toFixed(2),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white font-sans flex flex-col items-center p-4">
      <div className="w-full max-w-3xl bg-gray-900 rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          <a className="text-white no-underline" href="http://siveran.github.io/calc.html">
            Vorici Chromatic Calculator
          </a>
        </h1>
        <hr className="border-gray-600 mb-6" />

        <div className="mb-6">
          <table className="w-full table-auto border-collapse text-left">
            <tbody>
              <tr className="formRow socks">
                <td className="py-2 pr-4 text-lg">Total Sockets</td>
                <td className="py-2 pr-4">
                  <input
                    id="sockets"
                    type="number"
                    className="entry w-full bg-gray-700 border border-gray-600 rounded p-2 text-white placeholder-gray-400"
                    placeholder="#"
                    value={sockets}
                    onChange={(e) => setSockets(e.target.value)}
                  />
                </td>
                <td className="py-2 pr-4"></td>
              </tr>
              <tr className="formRow reqs">
                <td className="py-2 pr-4 text-lg">Requirements</td>
                <td className="py-2 pr-4">
                  <input
                    id="str"
                    type="number"
                    className="entry w-full bg-red-900 border border-gray-600 rounded p-2 text-white placeholder-red-400"
                    placeholder="str"
                    value={str}
                    onChange={(e) => setStr(e.target.value)}
                  />
                </td>
                <td className="py-2 pr-4">
                  <input
                    id="dex"
                    type="number"
                    className="entry w-full bg-green-900 border border-gray-600 rounded p-2 text-white placeholder-green-400"
                    placeholder="dex"
                    value={dex}
                    onChange={(e) => setDex(e.target.value)}
                  />
                </td>
                <td className="py-2 pr-4">
                  <input
                    id="int"
                    type="number"
                    className="entry w-full bg-blue-900 border border-gray-600 rounded p-2 text-white placeholder-blue-400"
                    placeholder="int"
                    value={int}
                    onChange={(e) => setInt(e.target.value)}
                  />
                </td>
                <td className="py-2 pr-4">
                  <button
                    id="calcButton"
                    className="go bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200 cursor-pointer"
                    onClick={handleCalculation}
                  >
                    Calculate
                  </button>
                </td>
              </tr>
              <tr className="formRow colors">
                <td className="py-2 pr-4 text-lg">Desired Colors</td>
                <td className="py-2 pr-4">
                  <input
                    id="red"
                    type="number"
                    className="entry w-full bg-red-900 border border-gray-600 rounded p-2 text-white placeholder-red-400"
                    placeholder="R"
                    value={red}
                    onChange={(e) => setRed(e.target.value)}
                  />
                </td>
                <td className="py-2 pr-4">
                  <input
                    id="green"
                    type="number"
                    className="entry w-full bg-green-900 border border-gray-600 rounded p-2 text-white placeholder-green-400"
                    placeholder="G"
                    value={green}
                    onChange={(e) => setGreen(e.target.value)}
                  />
                </td>
                <td className="py-2 pr-4">
                  <input
                    id="blue"
                    type="number"
                    className="entry w-full bg-blue-900 border border-gray-600 rounded p-2 text-white placeholder-blue-400"
                    placeholder="B"
                    value={blue}
                    onChange={(e) => setBlue(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr className="border-gray-600 mb-6" />
        
        <div className="mb-6">
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="text-lg bg-gray-800">
                <th className="px-4 py-2">Craft Type</th>
                <th className="px-4 py-2">Average Cost <br /><span className="text-sm">(in chromatics)</span></th>
                <th className="px-4 py-2">Success Chance</th>
                <th className="px-4 py-2">Average Attempts <br /><span className="text-sm">(mean)</span></th>
                <th className="px-4 py-2">Cost per Try <br /><span className="text-sm">(in chromatics)</span></th>
                <th className="px-4 py-2">Std. Deviation <br /><span className="text-sm">(of attempts)</span></th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="prob">
                  <td>{result.craftType}</td>
                  <td>{result.avgCost}</td>
                  <td>{result.successChance}</td>
                  <td>{result.avgAttempts}</td>
                  <td>{result.costPerTry}</td>
                  <td>{result.stdDeviation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center text-sm mt-6">
          <hr className="border-gray-600 mb-6" />
          <span className="font-bold">
            Note: Chromatic orbs cannot reroll the same color permutation twice, so the chromatic success chance is always higher than the drop rate.
          </span>
          <br />For mono-requirement items, on-color: 0.9 * (R + 10) / (R + 20)
          <br />For mono-requirement items, off-color: 0.05 + 4.5 / (R + 20)
          <br />For dual-requirement items, on-color: 0.9 * R1 / (R1 + R2)
          <br />For dual-requirement items, off-color: 10% flat chance, regardless of requirements
          <br />The formulas and color chances given are not guaranteed to be right (but I tried!)
          <br />Questions, comments, or want to contribute data? Post on{" "}
          <a href="http://www.reddit.com/r/pathofexile/comments/2kjcxe/vorici_chromatic_calculator_updated_with_new/" className="text-blue-500">
            Reddit
          </a>.
        </div>
      </div>
    </div>
  );
};

export default Home;
