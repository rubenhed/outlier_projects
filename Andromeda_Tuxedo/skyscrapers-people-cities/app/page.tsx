"use client"

import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from "recharts";
import { Building, Users, Coins, Calendar } from 'lucide-react';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

const Card = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
  <div className={cn("rounded-xl shadow p-4 bg-white dark:bg-gray-800", className)}>{children}</div>
);

const CardHeader = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
  <div className={cn("mb-2", className)}>{children}</div>
);

const CardTitle = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
  <h3 className={cn("text-lg font-bold", className)}>{children}</h3>
);

const CardContent = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
  <div className={cn("", className)}>{children}</div>
);

const CardDescription = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
  <p className={cn("text-sm text-gray-500", className)}>{children}</p>
);

const ChartTooltip = ({ content }: { content: React.ReactNode }) => <>{content}</>;
const ChartTooltipContent = (props: any) => <>{props.labelFormatter?.(props.label) || props.children}</>;

const Select = ({ value, onValueChange, children }: any) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className="p-2 rounded border dark:bg-gray-800"
  >
    {React.Children.map(children.props.children, (child: any) => (
      <option value={child.props.value}>{child.props.children}</option>
    ))}
  </select>
);

const SelectContent = ({ children }: React.PropsWithChildren) => <>{children}</>;
const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <option value={value}>{children}</option>
);

const TabsContext = React.createContext<{
  value: string;
  setValue: (val: string) => void;
} | null>(null);

const Tabs = ({ defaultValue, children, className }: React.PropsWithChildren<{ defaultValue: string; className?: string }>) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn(className)}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
  <div className={cn("flex gap-2", className)}>{children}</div>
);

const TabsTrigger = ({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.value === value;

  return (
    <button
      onClick={() => context.setValue(value)}
      className={cn(
        "px-4 py-2 rounded transition-colors",
        isActive ? "bg-white text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300" : "text-gray-600 dark:text-gray-400",
        className
      )}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className }: React.PropsWithChildren<{ value: string; className?: string }>) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  if (context.value !== value) return null;

  return <div className={cn("mt-4", className)}>{children}</div>;
};


interface CityData {
  name: string;
  population: number;
  skyscrapers: number;
  avgAge: number;
  avgWealth: number;
}

interface StatData {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface ChartData {
  name: string;
  skyscrapers: number;
  population: number;
}

interface PopulationDensityData {
  name: string;
  density: number;
}

interface WealthDistributionData {
  name: string;
  wealth: number;
}

const cities: CityData[] = [
  { name: "New York", population: 8398748, skyscrapers: 614, avgAge: 38.4, avgWealth: 65432 },
  { name: "Tokyo", population: 13969100, skyscrapers: 290, avgAge: 45.6, avgWealth: 74321 },
  { name: "Shanghai", population: 24870895, skyscrapers: 348, avgAge: 39.2, avgWealth: 58329 },
  { name: "London", population: 8825000, skyscrapers: 135, avgAge: 34.8, avgWealth: 72345 },
  { name: "Dubai", population: 3326000, skyscrapers: 245, avgAge: 30.2, avgWealth: 84672 },
  { name: "Paris", population: 2148000, skyscrapers: 44, avgAge: 37.4, avgWealth: 68934 },
  { name: "Hong Kong", population: 7481000, skyscrapers: 482, avgAge: 44.8, avgWealth: 76213 },
  { name: "Singapore", population: 5683600, skyscrapers: 164, avgAge: 42.2, avgWealth: 83592 },
  { name: "Seoul", population: 10231875, skyscrapers: 125, avgAge: 41.6, avgWealth: 67453 },
  { name: "Beijing", population: 21516000, skyscrapers: 154, avgAge: 38.8, avgWealth: 59327 },
];

const SkyscraperDensityChart = ({ data }: { data: ChartData[] }) => {
  console.log("this is data", data);

  const filteredData = data.filter(city => city.skyscrapers > 0);
  console.log("Filtered data", filteredData);

  return (
    <div className="h-[600px] w-full p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 transition-colors">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Skyscraper Density vs Population
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Comparing cities by skyscraper count and population size
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb dark:#374151" />
          <XAxis
            dataKey="name"
            stroke="#6b7280"
            tick={{ fill: "#6b7280" }}
            tickLine={{ stroke: "#d1d5db dark:#4b5563" }}
            label={{
              value: "City",
              position: "insideBottom",
              offset: -15,
              style: { fill: "#6b7280", textAnchor: "middle" },
            }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            width={100}
            stroke="#6b7280"
            tick={{ fill: "#6b7280" }}
            tickLine={{ stroke: "#d1d5db dark:#4b5563" }}
            label={{
              value: "Population",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#6b7280", textAnchor: "middle" },
            }}
          />
          <Bar dataKey="population" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>

    </div>

  );
};

const PopulationDensityChart = ({ data }: { data: PopulationDensityData[] }) => {
  console.log("this is dataaaaa", data);

  return (
    <div className="h-[600px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb dark:#374151" />
          <XAxis
            dataKey="name"
            stroke="#6b7280"
            tick={{ fill: "#6b7280" }}
            tickLine={{ stroke: "#d1d5db dark:#4b5563" }}
            label={{
              value: "City",
              position: "insideBottom",
              offset: -10,
              style: { fill: "#6b7280", textAnchor: "middle" },
            }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="#6b7280"
            width={100}
            tick={{ fill: "#6b7280" }}
            tickLine={{ stroke: "#d1d5db dark:#4b5563" }}
            label={{
              value: "People per Skyscraper",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#6b7280", textAnchor: "middle" },
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="density"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ stroke: "#10b981", strokeWidth: 2, r: 4, fill: "#ffffff" }}
            activeDot={{ r: 8, stroke: "#059669", fill: "#059669" }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


const WealthDistributionChart = ({ data }: { data: WealthDistributionData[] }) => {
  return (
    <div className="h-[600px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
          <defs>
            <linearGradient id="wealthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#d97706" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb dark:#374151" />
          <XAxis
            dataKey="name"
            stroke="#6b7280"
            tick={{ fill: "#6b7280" }}
            tickLine={{ stroke: "#d1d5db dark:#4b5563" }}
            label={{
              value: "City",
              position: "insideBottom",
              offset: -10,
              style: { fill: "#6b7280", textAnchor: "middle" }
            }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            width={100}
            stroke="#6b7280"
            tick={{ fill: "#6b7280" }}
            tickLine={{ stroke: "#d1d5db dark:#4b5563" }}
            label={{
              value: "Average Wealth ($)",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#6b7280", textAnchor: "middle" }
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="wealth"
            stroke="#f59e0b"
            strokeWidth={2}
            fill="url(#wealthGradient)"
            activeDot={{ r: 8, stroke: "#d97706", fill: "#d97706" }}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};


const CityDashboard = () => {
  const [selectedCity, setSelectedCity] = useState<string>(cities[0].name);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const cityData = cities.find(city => city.name === selectedCity);

  const chartData: ChartData[] = cities.map(city => ({
    name: city.name,
    skyscrapers: city.skyscrapers,
    population: city.population,
  }));

  const populationDensityData: PopulationDensityData[] = cities.map(city => ({
    name: city.name,
    density: Math.round(city.population / city.skyscrapers),
  }));

  const wealthDistributionData: WealthDistributionData[] = cities.map(city => ({
    name: city.name,
    wealth: city.avgWealth,
  }));

  const stats: StatData[] = [
    {
      label: "Total Population",
      value: cityData ? cityData.population.toLocaleString() : "0",
      icon: <Users className="h-6 w-6 text-indigo-500" />,
      color: "bg-indigo-50 dark:bg-indigo-900/20"
    },
    {
      label: "Total Skyscrapers",
      value: cityData ? cityData.skyscrapers.toString() : "0",
      icon: <Building className="h-6 w-6 text-rose-500" />,
      color: "bg-rose-50 dark:bg-rose-900/20"
    },
    {
      label: "Average Age",
      value: cityData ? cityData.avgAge.toFixed(1) : "0.0",
      icon: <Calendar className="h-6 w-6 text-emerald-500" />,
      color: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      label: "Average Wealth",
      value: cityData ? `$${cityData.avgWealth.toLocaleString()}` : "$0",
      icon: <Coins className="h-6 w-6 text-sky-500" />,
      color: "bg-sky-50 dark:bg-sky-900/20"
    },
  ];

  const containerClass = cn(
    "p-6 md:p-8 transition-colors",
    "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50",
    "dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"
  );

  const sectionClass = cn(
    "mb-8 transition-all",
    "bg-white dark:bg-gray-800",
    "rounded-2xl shadow-lg overflow-hidden",
    "border border-gray-200 dark:border-gray-700"
  );

  const headerClass = cn(
    "mb-6 border-b border-gray-200 dark:border-gray-700",
    "bg-gradient-to-r from-indigo-100 to-purple-100",
    "dark:from-indigo-900/30 dark:to-purple-900/30",
    "px-6 py-4"
  );

  const titleClass = cn(
    "text-2xl font-bold text-transparent bg-clip-text",
    "bg-gradient-to-r from-indigo-600 to-purple-600",
    "dark:from-indigo-400 dark:to-purple-400"
  );

  const descriptionClass = cn(
    "text-sm text-indigo-600 dark:text-indigo-400",
    "mt-1"
  );

  const cardGridClass = cn(
    "grid grid-cols-1 md:grid-cols-2 gap-6",
    "px-6"
  );

  const largeCardClass = cn(
    "col-span-1 md:col-span-2",
    "p-6 transition-all",
    "bg-white dark:bg-gray-800",
    "rounded-xl shadow-md overflow-hidden",
    "border border-gray-200 dark:border-gray-700",
    "hover:shadow-lg",
  );

  const cardHeaderClass = cn(
    "mb-4 border-b border-gray-200 dark:border-gray-700",
    "pb-3"
  );

  const cardTitleClass = cn(
    "text-lg font-semibold text-gray-900 dark:text-white",
    "flex items-center gap-2"
  );

  const cardContentClass = cn(
    "text-3xl font-bold text-indigo-600 dark:text-indigo-400",
    "flex items-center gap-2"
  );

  const toggleButtonClass = cn(
    "flex items-center gap-2 px-4 py-2 rounded-lg",
    "bg-indigo-100 dark:bg-indigo-900/30",
    "text-indigo-600 dark:text-indigo-400",
    "hover:bg-indigo-200 dark:hover:bg-indigo-900/50",
    "transition-colors cursor-pointer"
  );

  return (
    <div className={containerClass}>
      <div className="max-w-7xl mx-auto">
        <div className={cn("flex flex-col md:flex-row items-center justify-between mb-8 gap-4", headerClass)}>
          <div className="text-center md:text-left">
            <h1 className={titleClass}>Global City Skyscraper Dashboard</h1>
            <p className={descriptionClass}>Population density and wealth distribution across major cities</p>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select City</label>
            <div className="w-full md:w-[200px] rounded dark:text-white">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>
        </div>

        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", cardGridClass)}>
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={cn(
                "overflow-hidden group transition-all",
                stat.color,
                "hover:shadow-lg hover:-translate-y-1"
              )}
            >
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className={cardTitleClass}>
                      {stat.label}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                      {stat.label === "Total Population" && "City population count"}
                      {stat.label === "Total Skyscrapers" && "Number of skyscrapers"}
                      {stat.label === "Average Age" && "Median age of residents"}
                      {stat.label === "Average Wealth" && "Median household wealth"}
                    </CardDescription>
                  </div>
                  <div className={cn(
                    "p-3 rounded-lg transition-all",
                    "bg-white/80 dark:bg-gray-900/80",
                    "group-hover:scale-110"
                  )}>
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className={cardContentClass}>
                    {stat.value}
                  </span>
                  <div className={cn(
                    "text-xs px-2 py-1 rounded-full transition-all",
                    "bg-white/80 dark:bg-gray-900/80",
                    "group-hover:bg-white dark:group-hover:bg-gray-900 dark:text-white"
                  )}>
                    {stat.label === "Total Population" && "people"}
                    {stat.label === "Total Skyscrapers" && "buildings"}
                    {stat.label === "Average Age" && "years"}
                    {stat.label === "Average Wealth" && "USD"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={sectionClass}>
          <div className={headerClass}>
            <div className="flex items-center justify-between">
              <h2 className={titleClass}>City Insights</h2>
              <div className={toggleButtonClass} onClick={() => setShowAdvanced(!showAdvanced)}>
                <span>{showAdvanced ? "Hide Advanced" : "Show Advanced"}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${showAdvanced ? "transform rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            <p className={descriptionClass}>Detailed statistics and city comparisons</p>
          </div>

          <div className={cardGridClass}>
            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className={cardHeaderClass}>
                <CardTitle className={cardTitleClass}>
                  <Users className="h-5 w-5 text-indigo-500" />
                  Population Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Population</span>
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {cityData?.population.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Population Density</span>
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {cityData ? `${Math.round(cityData.population / 1000).toLocaleString()} per km²` : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Household Size</span>
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {cityData ? (Math.round(cityData.population / 1000) / 10).toLocaleString() : "N/A"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className={cardHeaderClass}>
                <CardTitle className={cardTitleClass}>
                  <Building className="h-5 w-5 text-indigo-500" />
                  Skyscraper Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Skyscrapers</span>
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {cityData?.skyscrapers}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Skyscrapers per Capita</span>
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {cityData ? (Math.round((cityData?.skyscrapers / cityData?.population) * 100000) / 100000).toLocaleString() : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Height</span>
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {Math.round(200 + Math.random() * 100)}m
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {showAdvanced && (
              <>
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader className={cardHeaderClass}>
                    <CardTitle className={cardTitleClass}>
                      <Coins className="h-5 w-5 text-indigo-500" />
                      Wealth Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Wealth</span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          ${cityData?.avgWealth.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Wealth per Capita</span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          ${cityData ? ((cityData?.avgWealth / cityData?.population * 1000).toFixed(2)) : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">City GDP</span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          ${cityData ? ((cityData?.avgWealth * cityData?.population / 1000).toLocaleString()) : "N/A"}B
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader className={cardHeaderClass}>
                    <CardTitle className={cardTitleClass}>
                      <Calendar className="h-5 w-5 text-indigo-500" />
                      Demographic Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Age</span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {cityData?.avgAge.toFixed(1)} years
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Age Distribution</span>
                        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 flex gap-2">
                          <span>{Math.floor(cityData?.avgAge! - 10)}-</span>
                          <span>{Math.ceil(cityData?.avgAge! + 10)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Population Growth</span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {Math.round(Math.random() * 10)}% annually
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader className={cardHeaderClass}>
                    <CardTitle className={cardTitleClass}>
                      <Building className="h-5 w-5 text-indigo-500" />
                      Skyscraper Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Tallest Building</span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {Math.round(300 + Math.random() * 200)}m
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Height</span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {Math.round(150 + Math.random() * 50)}m
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Building Density</span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {cityData ? (Math.round(cityData?.skyscrapers / 10)) : "N/A"} per km²
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader className={cardHeaderClass}>
                    <CardTitle className={cardTitleClass}>
                      <Coins className="h-5 w-5 text-indigo-500" />
                      Economic Indicators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">GDP per Capita</span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          ${cityData ? ((cityData?.avgWealth / 1000).toLocaleString()) : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Unemployment Rate</span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {Math.round(Math.random() * 10)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Economic Growth</span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {Math.round(Math.random() * 10)}% annually
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        <div className={cn("lg:w-3/4 mx-auto mb-8", cardGridClass)}>
          <div className={largeCardClass}>
            <div className={cardHeaderClass}>
              <h3 className={cardTitleClass}>
                <Building className="h-5 w-5 text-indigo-500" />
                Skyscraper Distribution
              </h3>
            </div>
            <SkyscraperDensityChart data={chartData} />
          </div>

          <div className={cn(largeCardClass, "lg:col-span-2")}>
            <Tabs defaultValue="density" className="w-full">
              <TabsList className={cn(
                "grid w-full md:w-auto grid-cols-2 md:inline-flex",
                "bg-indigo-100 dark:bg-indigo-900/30",
                "p-1 rounded-lg"
              )}>
                <TabsTrigger
                  value="density"
                  className={cn(
                    "data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-950",
                    "data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-300",
                    "rounded-md px-4 py-2 transition-all"
                  )}
                >
                  Population Density
                </TabsTrigger>
                <TabsTrigger
                  value="wealth"
                  className={cn(
                    "data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-950",
                    "data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-300",
                    "rounded-md px-4 py-2 transition-all"
                  )}
                >
                  Wealth Distribution
                </TabsTrigger>
              </TabsList>

              <TabsContent value="density" className="mt-6">
                <div className={cardHeaderClass}>
                  <h3 className={cardTitleClass}>
                    <Users className="h-5 w-5 text-indigo-500" />
                    People per Skyscraper
                  </h3>
                </div>
                <PopulationDensityChart data={populationDensityData} />
              </TabsContent>

              <TabsContent value="wealth" className="mt-6">
                <div className={cardHeaderClass}>
                  <h3 className={cardTitleClass}>
                    <Coins className="h-5 w-5 text-indigo-500" />
                    Average Wealth
                  </h3>
                </div>
                <WealthDistributionChart data={wealthDistributionData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>


      </div>
    </div>

  );
};

export default CityDashboard;
