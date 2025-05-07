"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const currencies = ["USD", "EUR", "JPY"];

const mockRates: Record<string, Record<string, number>> = {
  USD: { EUR: 0.93, JPY: 156.2, GBP: 0.8, AUD: 1.5 },
  EUR: { USD: 1.07, JPY: 167.5, GBP: 0.86, AUD: 1.61 },
};

const mockHistory: Record<string, { date: string; rate: number }[]> = {
  "USD_EUR": [
    { date: "2025-04-01", rate: 0.92 },
    { date: "2025-04-08", rate: 0.915 },
    { date: "2025-04-15", rate: 0.925 },
    { date: "2025-04-22", rate: 0.93 },
    { date: "2025-04-29", rate: 0.935 },
  ],
  "USD_JPY": [
    { date: "2025-04-01", rate: 155.0 },
    { date: "2025-04-08", rate: 155.5 },
    { date: "2025-04-15", rate: 156.0 },
    { date: "2025-04-22", rate: 156.5 },
    { date: "2025-04-29", rate: 157.0 },
  ],
  "EUR_USD": [
    { date: "2025-04-01", rate: 1.08 },
    { date: "2025-04-08", rate: 1.075 },
    { date: "2025-04-15", rate: 1.07 },
    { date: "2025-04-22", rate: 1.065 },
    { date: "2025-04-29", rate: 1.06 },
  ],
  "EUR_JPY": [
    { date: "2025-04-01", rate: 167.0 },
    { date: "2025-04-08", rate: 167.5 },
    { date: "2025-04-15", rate: 168.0 },
    { date: "2025-04-22", rate: 168.5 },
    { date: "2025-04-29", rate: 169.0 },
  ],
  "JPY_USD": [
    { date: "2025-04-01", rate: 0.0065 },
    { date: "2025-04-08", rate: 0.0064 },
    { date: "2025-04-15", rate: 0.0063 },
    { date: "2025-04-22", rate: 0.0062 },
    { date: "2025-04-29", rate: 0.0061 },
  ],
  "JPY_EUR": [
    { date: "2025-04-01", rate: 0.0058 },
    { date: "2025-04-08", rate: 0.00585 },
    { date: "2025-04-15", rate: 0.0059 },
    { date: "2025-04-22", rate: 0.00595 },
    { date: "2025-04-29", rate: 0.006 },
  ],
};

const App = () => {
  const [firstCurrency, setFirstCurrency] = useState<string>("USD");
  const [secondCurrency, setSecondCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ date: string; rate: number }[]>(mockHistory["USD_EUR"]);

  useEffect(() => {
    const rate = mockRates[firstCurrency]?.[secondCurrency];
    if (rate) {
      setConvertedAmount(amount * rate);
      const historyKey = `${firstCurrency}_${secondCurrency}`;
      const history = mockHistory[historyKey];
      if (history) {
        setChartData(history);
      } else {
        setChartData([]);
      }
    } else {
      setConvertedAmount(null);
      setChartData([]);
    }
  }, [firstCurrency, secondCurrency, amount]);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-lg max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-600 dark:text-green-200">Currency Converter</h1>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <select
              className="p-2 border rounded-lg flex-1 bg-white dark:bg-gray-600 dark:text-white"
              value={firstCurrency}
              onChange={(e) => setFirstCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <select
              className="p-2 border rounded-lg flex-1 bg-white dark:bg-gray-600 dark:text-white"
              value={secondCurrency}
              onChange={(e) => setSecondCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            className="p-2 border rounded-lg bg-white dark:bg-gray-600 dark:text-white"
            value={amount}
            min="0"
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          {convertedAmount !== null && (
            <div className="text-center text-xl font-bold text-green-600 dark:text-green-200">
              {amount} {firstCurrency} = {convertedAmount.toFixed(2)} {secondCurrency}
            </div>
          )}

          <div className="my-6 border-t border-gray-300 dark:border-gray-500" />

          <div className="text-center text-lg font-semibold mb-4 text-green-600 dark:text-green-200">Rate</div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" tick={{ fontSize: 12, dy: 10 }}  />
                <YAxis tick={{ fontSize: 12, dx: -10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
