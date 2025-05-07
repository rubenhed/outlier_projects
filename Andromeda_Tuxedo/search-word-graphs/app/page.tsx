"use client"

import React, { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, LabelList } from 'recharts';
import { motion } from 'motion/react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

interface SearchData {
  name: string;
  searches: number;
  color?: string;
  fill?: string;
}

interface SearchTrend {
  date: string;
  [keyword: string]: number | string;
}

interface MonthlyLeader {
  name: string;
  searches: number;
}

interface StatDisplayProps {
  title: string;
  value: string | number;
  change: string;
  trend?: 'up' | 'down';
}

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

interface SearchDataState {
  daily: SearchData[];
  trends: SearchTrend[];
  monthly: MonthlyLeader[];
  isLoading: boolean;
  error: string | null;
}

const COLORS = ['#3B82F6', '#0EA5E9', '#38BDF8', '#0284C7', '#0369A1', '#2563EB', '#1D4ED8', '#06B6D4'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return percent > 0.05 ? (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const StatDisplay = ({ title, value, change, trend = 'up' }: StatDisplayProps) => (
  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between group hover:shadow-md transition-all duration-300">
    <div>
      <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">{title}</p>
      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">{value}</p>
      <div className="flex items-center gap-1 mt-2 text-sm">
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${trend === 'up'
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-rose-100 text-rose-700'
          }`}>
          {trend === 'up' ? '▲' : '▼'} {Math.abs(Number(change))}%
        </span>
        <span className="text-gray-500">vs last period</span>
      </div>
    </div>
    <div className={`p-4 rounded-full bg-gradient-to-br ${trend === 'up' ? 'from-emerald-400 to-emerald-600' : 'from-rose-400 to-rose-600'} text-white shadow-lg`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={trend === 'up' ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
      </svg>
    </div>
  </div>
);

const ChartContainer = ({ title, children }: ChartContainerProps) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const SearchEngineViz = () => {
  const [data, setData] = useState<SearchDataState>({
    daily: [],
    trends: [],
    monthly: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const mockData = {
      daily: [
        { name: "React", searches: 1200 },
        { name: "Next.js", searches: 950 },
        { name: "Tailwind", searches: 800 },
        { name: "TypeScript", searches: 700 },
        { name: "Node.js", searches: 650 }
      ],
      trends: [
        { date: "2025-04-01", React: 400, "Next.js": 300, Tailwind: 200 },
        { date: "2025-04-02", React: 420, "Next.js": 310, Tailwind: 210 },
        { date: "2025-04-03", React: 450, "Next.js": 320, Tailwind: 220 },
        { date: "2025-04-04", React: 470, "Next.js": 330, Tailwind: 230 },
        { date: "2025-04-05", React: 490, "Next.js": 340, Tailwind: 240 },
        { date: "2025-04-06", React: 510, "Next.js": 350, Tailwind: 250 },
        { date: "2025-04-07", React: 530, "Next.js": 360, Tailwind: 260 },
        { date: "2025-04-08", React: 550, "Next.js": 370, Tailwind: 270 },
        { date: "2025-04-09", React: 570, "Next.js": 380, Tailwind: 280 },
        { date: "2025-04-10", React: 600, "Next.js": 390, Tailwind: 290 },
        { date: "2025-04-11", React: 620, "Next.js": 400, Tailwind: 300 },
        { date: "2025-04-12", React: 640, "Next.js": 410, Tailwind: 310 },
        { date: "2025-04-13", React: 660, "Next.js": 420, Tailwind: 320 },
        { date: "2025-04-14", React: 680, "Next.js": 430, Tailwind: 330 }
      ],

      monthly: [
        { name: "React", searches: 9000 },
        { name: "Next.js", searches: 8500 },
        { name: "Tailwind", searches: 7000 }
      ]
    };

    setData({
      daily: mockData.daily,
      trends: mockData.trends,
      monthly: mockData.monthly,
      isLoading: false,
      error: null
    });
  }, []);



  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };


  const totalSearches = data.daily.reduce((sum, item) => sum + item.searches, 0);
  const averageDailySearches = data.trends.length
    ? Math.round(
      data.trends.reduce((sum, day) => {
        const numbers = Object.values(day).filter((v): v is number => typeof v === 'number');
        return sum + numbers.reduce((a, b) => a + b, 0);
      }, 0) / data.trends.length
    )
    : 0;

  const topKeyword = [...data.daily]
    .sort((a, b) => b.searches - a.searches)[0]?.name || 'N/A';
  const topMonthlySearches = data.monthly[0]?.searches || 0;


  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 dark:from-gray-800 dark:to-gray-900 ${inter.className}`}>

      <Toaster position="top-right" richColors />

      <header className="bg-white/90 dark:bg-white/10 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                  SearchSphere
                </span>
              </div>
              <div className="hidden md:block ml-4">
                <div className="flex items-baseline space-x-4">
                  <a href="#" className="bg-blue-800/90 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-900/90 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600">
                    Dashboard
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Search Analytics</h1>
              <p className="text-gray-500 mt-1 dark:text-gray-200">Discover the most searched terms and trends</p>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <StatDisplay
              title="Total Searches"
              value={totalSearches.toLocaleString()}
              change="+12.5"
              trend="up"
            />
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <StatDisplay
              title="Avg. Daily Searches"
              value={averageDailySearches.toLocaleString()}
              change="-2.1"
              trend="down"
            />
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <StatDisplay
              title="Top Keyword"
              value={topKeyword}
              change="+8.3"
              trend="up"
            />
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <StatDisplay
              title="This Month"
              value={topMonthlySearches.toLocaleString()}
              change="+5.7"
              trend="up"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <ChartContainer title="Search Distribution">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                    <defs>
                      {COLORS.map((color, index) => (
                        <radialGradient
                          key={`pieGradient-${index}`}
                          id={`pieGradient-${index}`}
                          cx="50%"
                          cy="50%"
                          r="50%"
                          fx="50%"
                          fy="50%"
                        >
                          <stop offset="0%" stopColor={color} stopOpacity={0.95} />
                          <stop offset="100%" stopColor={color} stopOpacity={0.75} />
                        </radialGradient>
                      ))}
                      <filter id="pieShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
                      </filter>
                    </defs>
                    <Pie
                      data={data.daily}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={180}
                      innerRadius={60}
                      dataKey="searches"
                      nameKey="name"
                      animationBegin={200}
                      animationDuration={1500}
                      strokeWidth={2}
                      stroke="#fff"
                      filter="url(#pieShadow)"
                    >
                      {data.daily.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#pieGradient-${index % COLORS.length})`}
                          style={{
                            filter: `drop-shadow(0 2px 4px ${COLORS[index % COLORS.length].replace('0x', '#')})`
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const percentage = ((data.searches / totalSearches) * 100).toFixed(1);
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg p-0 overflow-hidden"
                              style={{
                                boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.25), 0 8px 10px -6px rgba(59, 130, 246, 0.1)',
                                maxWidth: '200px',
                                overflow: 'hidden'
                              }}
                            >
                              <div className="bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2 text-white">
                                <div className="text-sm font-semibold">{data.name}</div>
                              </div>
                              <div className="p-3">
                                <div className="flex items-center justify-between mb-2 gap-3">
                                  <span className="text-gray-500 text-xs">Searches:</span>
                                  <span className="text-gray-900 font-bold text-lg">{data.searches.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-500 text-xs">Share:</span>
                                  <span className="text-blue-600 font-medium">{percentage}%</span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        }
                        return null;
                      }}
                      cursor={{ fill: 'rgba(59, 130, 246, 0.1)', strokeDasharray: '3 3', strokeWidth: 1, stroke: '#3B82F6' }}
                      position={{ y: -10 }}
                      wrapperStyle={{ outline: 'none', zIndex: 1000, minWidth: '200px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <ChartContainer title="Top Search Trends">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.daily}
                    margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
                    barSize={44}
                    barGap={8}
                  >
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.95} />
                        <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.85} />
                      </linearGradient>
                      <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3B82F6" floodOpacity="0.15" />
                      </filter>
                    </defs>
                    <XAxis
                      dataKey="name"
                      stroke="#6B7280"
                      tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 500 }}
                      axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                      tickLine={false}
                      label={{
                        value: 'Search Terms',
                        position: 'insideBottom',
                        offset: -15,
                        fill: "#6B7280",
                        fontSize: 12,
                        fontWeight: 'bold'
                      }}
                    />
                    <YAxis
                      stroke="#6B7280"
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                      tickLine={false}
                      label={{
                        value: 'Number of Searches',
                        angle: -90,
                        position: 'insideLeft',
                        fill: "#6B7280",
                        fontSize: 12,
                        fontWeight: 'bold',
                        dy: 60
                      }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg p-0 overflow-hidden"
                              style={{
                                boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.25), 0 8px 10px -6px rgba(59, 130, 246, 0.1)',
                                maxWidth: '200px',
                                overflow: 'hidden'
                              }}
                            >
                              <div className="bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2 text-white">
                                <div className="text-sm font-semibold">{data.name}</div>
                              </div>
                              <div className="p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-gray-500 text-xs">Searches:</span>
                                  <span className="text-gray-900 font-bold text-lg">{data.searches.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-500 text-xs">Share:</span>
                                  <span className="text-blue-600 font-medium">{((data.searches / totalSearches) * 100).toFixed(1)}%</span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        }
                        return null;
                      }}
                      cursor={{ fill: 'rgba(59, 130, 246, 0.1)', strokeDasharray: '3 3', strokeWidth: 1, stroke: '#3B82F6' }}
                      position={{ y: -10 }}
                      wrapperStyle={{ outline: 'none', zIndex: 1000, minWidth: '200px' }}
                    />
                    <Bar
                      dataKey="searches"
                      name="Searches"
                      radius={[8, 8, 0, 0]}
                      animationBegin={200}
                      animationDuration={1500}
                      fill="url(#barGradient)"
                      filter="url(#barShadow)"
                    >
                      <LabelList
                        dataKey="searches"
                        position="top"
                        fill="#6B7280"
                        fontSize={12}
                        formatter={(value: number) => value.toLocaleString()}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }} className="lg:col-span-2">
            <ChartContainer title="Search Volume Over Time">
              <div className="h-[400px]">
                <ResponsiveContainer width="95%" height="100%">
                  <AreaChart
                    data={data.trends}
                    margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
                  >
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
                        <stop offset="75%" stopColor="#3B82F6" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
                      </linearGradient>
                      <filter id="areaShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3B82F6" floodOpacity="0.1" />
                      </filter>
                    </defs>
                    <XAxis
                      dataKey="date"
                      stroke="#6B7280"
                      tick={{ fill: "#6B7280", fontSize: 11 }}
                      axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                      tickLine={false}
                      label={{
                        value: 'Date',
                        position: 'insideBottom',
                        offset: -15,
                        fill: "#6B7280",
                        fontSize: 12,
                        fontWeight: 'bold'
                      }}
                    />
                    <YAxis
                      stroke="#6B7280"
                      tick={{ fill: "#6B7280", fontSize: 11 }}
                      axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                      tickLine={false}
                      label={{
                        value: 'Search Volume',
                        angle: -90,
                        position: 'insideLeft',
                        fill: "#6B7280",
                        fontSize: 12,
                        fontWeight: 'bold',
                        dy: 60
                      }}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg p-0 overflow-hidden"
                              style={{
                                boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.25), 0 8px 10px -6px rgba(59, 130, 246, 0.1)',
                                minWidth: '240px',
                                overflow: 'hidden'
                              }}
                            >
                              <div className="bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2 text-white">
                                <div className="text-sm font-semibold">{formatDate(label)}</div>
                              </div>
                              <div className="p-3">
                                {payload.map((entry, index) => (
                                  <div key={`tooltip-${index}`} className="mb-2 last:mb-0">
                                    <div className="flex items-center justify-between">
                                      <span className="text-gray-500 text-xs">{entry.name}:</span>
                                      <span className="text-gray-900 font-bold text-lg">{entry.value?.toLocaleString()}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          );
                        }
                        return null;
                      }}
                      cursor={{ fill: 'rgba(59, 130, 246, 0.1)', strokeDasharray: '3 3', strokeWidth: 1, stroke: '#3B82F6' }}
                      position={{ y: -10 }}
                      wrapperStyle={{ outline: 'none', zIndex: 1000, minWidth: '200px' }}
                    />
                    {Object.keys(data.trends[0] || {})
                      .filter((key) => key !== "date")
                      .map((key, index) => (
                        <Area
                          key={key}
                          type="monotone"
                          dataKey={key}
                          stroke={COLORS[index % COLORS.length]}
                          fillOpacity={0.3}
                          fill={COLORS[index % COLORS.length]}
                          strokeWidth={2}
                          activeDot={{ r: 6, fill: COLORS[index % COLORS.length], stroke: 'white', strokeWidth: 2 }}
                          dot={{ r: 4, fill: COLORS[index % COLORS.length], stroke: 'white', strokeWidth: 2 }}
                        />
                      ))}

                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </motion.div>
        </div>

        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Search Trends</h3>
          </div>
          <div className="p-6">
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase trackingGroup">Keyword</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Daily Searches
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Weekly Change
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monthly Volume
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Competitive Index
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.daily.map((item, index) => (
                      <motion.tr
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: 'rgba(248, 250, 252, 1)', y: -2 }}
                        className="group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center">
                                <span className="text-blue-600 font-medium text-sm">
                                  {item.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">{item.searches.toLocaleString()}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-sky-500 h-1.5 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${Math.min(100, (item.searches / totalSearches) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.searches > 1000
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700 '
                            }`}>
                            {item.searches > 1000 ? '▲' : '▼'} {Math.abs(item.searches % 10)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(item.searches * 7).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-sky-500 h-2 rounded-full"
                                style={{ width: `${Math.min(100, (item.searches / topMonthlySearches) * 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {Math.round((item.searches / topMonthlySearches) * 100)}%
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Top Searchers</h3>
              <ul className="space-y-3">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <span className="text-white font-medium">JD</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium">John Doe</div>
                        <div className="text-xs opacity-80">12 searches</div>
                      </div>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      #{index + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Categories</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Technology', searches: 4200, color: 'blue' },
                  { name: 'Sports', searches: 3800, color: 'emerald' },
                  { name: 'Entertainment', searches: 3600, color: 'rose' },
                  { name: 'Business', searches: 2800, color: 'indigo' },
                  { name: 'Health', searches: 2200, color: 'teal' },
                ].map((category, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-${category.color}-100 flex items-center justify-center mr-3`}>
                        <span className={`text-${category.color}-600 font-medium text-sm`}>
                          {category.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        <div className="text-xs text-gray-500">{category.searches.toLocaleString()} searches</div>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {Math.round((category.searches / totalSearches) * 100)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Insights</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Mobile vs Desktop</span>
                    <span className="text-gray-900 font-medium">60% Mobile</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-sky-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Avg. Search Duration</span>
                    <span className="text-gray-900 font-medium">2m 15s</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-sky-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Bounce Rate</span>
                    <span className="text-gray-900 font-medium">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-sky-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="bg-white/90 backdrop-blur-sm mt-16 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                SearchSphere
              </span>
              <p className="text-gray-500 mt-2 max-w-md">Your window into the world's search trends. Analyze, visualize, and understand what's trending globally.</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">© {new Date().getFullYear()} SearchSphere. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchEngineViz;
