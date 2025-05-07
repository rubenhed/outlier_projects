"use client"

import React, { useState, useEffect, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

interface InputProts extends Props {
  type?: string;
  placeholder?: string;
}

interface BadgeProps extends Props {
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const Button = ({ children, className, ...props }: Props) => (
  <button
    className={`px-4 py-2 rounded-md transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className }: Props) => (
  <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }: Props) => (
  <div className={`border-b border-gray-200 dark:border-gray-600 px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }: Props) => (
  <h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className }: Props) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

const Input = ({ className, ...props }: InputProts) => (
  <input
    className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
);

const Badge = ({ children, variant = "default", className }: BadgeProps) => {
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const SalesDashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    {
      name: "Total Sales",
      value: "$12,345",
      change: "+12%",
      trend: "up",
      icon: "💰",
    },
    {
      name: "Average Order Value",
      value: "$245",
      change: "+5%",
      trend: "up",
      icon: "📊",
    },
    {
      name: "Conversion Rate",
      value: "3.2%",
      change: "-0.5%",
      trend: "down",
      icon: "📈",
    },
    {
      name: "Active Customers",
      value: "1,234",
      change: "+8%",
      trend: "up",
      icon: "👥",
    },
  ];

  const salesData = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 120 },
    { name: "Mar", value: 150 },
    { name: "Apr", value: 180 },
    { name: "May", value: 200 },
    { name: "Jun", value: 220 },
  ];

  const topProducts = [
    { id: 1, name: "Ronin Katana", category: "Premium", sales: 245, revenue: 61250 },
    { id: 2, name: "Samurai Edge", category: "Premium", sales: 198, revenue: 49500 },
    { id: 3, name: "Bushido Blade", category: "Standard", sales: 142, revenue: 28400 },
    { id: 4, name: "Dragon's Tooth", category: "Premium", sales: 93, revenue: 23250 },
    { id: 5, name: "Akame Special", category: "Standard", sales: 68, revenue: 13600 },
  ];

  const salesChannels = [
    { name: "Website", sales: 5200, revenue: 1300000 },
    { name: "Retail Stores", sales: 1800, revenue: 450000 },
    { name: "Trade Shows", sales: 1200, revenue: 300000 },
    { name: "Online Marketplaces", sales: 800, revenue: 200000 },
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-800 ${mounted ? "fade-in" : "opacity-0"}`}>
      <header className="bg-white shadow-sm sticky top-0 z-10 dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-1.5 mr-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-200">
                Katana Haven Sales Dashboard
              </h1>
              <div className="hidden md:block ml-4">
                <Badge variant="success">Live</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mt-4 md:mt-0 dark:text-white">
                Sales Performance
              </h2>
              <p className="text-gray-500 mt-1">Overview of sales metrics</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-64 pl-10 text-black dark:text-white"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-200">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${stat.trend === "up"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {stat.trend === "up" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-full ${stat.trend === "up" ? "bg-green-50" : "bg-red-50"
                      }`}
                  >
                    <span className="text-xl">{stat.icon}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle>Monthly Sales Trend</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="h-72 flex items-end">
      <div className="relative w-full h-full">
        {/* Y-axis lines and values */}
        <div className="absolute inset-0 flex flex-col justify-between mx-3">
          {[20000, 15000, 10000, 5000, 0].map((value) => (
            <div key={value} className="relative h-[20%]">
              <div className="absolute left-0 top-0 w-full h-px bg-gray-200 dark:bg-gray-600" />
              <span className="text-xs text-gray-500 absolute -left-6 top-1/2 transform -translate-y-1/2 w-6 text-right">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Bars and labels */}
        <div className="absolute inset-0 flex items-end justify-between px-4 ms-5">
          {salesData.map((item) => (
            <div key={item.name} className="flex flex-col items-center w-8">
              <div
                className="bg-blue-500 rounded-t-md transition-all duration-300 hover:bg-blue-600"
                style={{
                  height: `${(item.value / 250) * 16}rem`,
                  width: "100%",
                }}
              ></div>
              <span className="mt-1 text-xs font-medium text-gray-500 text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </CardContent>
</Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </span>
                        <br />
                        <Badge variant="default">{product.category}</Badge>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${product.revenue}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full"
                        style={{ width: `${(product.sales / 245) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="mb-8 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Sales by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200 dark:text-white dark:border-gray-600">
                    <th className="px-4 py-3">Channel</th>
                    <th className="px-4 py-3">Sales</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {salesChannels.map((channel, index) => (
                    <tr
                      key={channel.name}
                      className={`${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-950" : "bg-white dark:bg-gray-900"
                        } hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-gray-200`}
                    >
                      <td className="px-4 py-3 font-medium">
                        {channel.name}
                      </td>
                      <td className="px-4 py-3">{channel.sales}</td>
                      <td className="px-4 py-3">${channel.revenue}</td>
                      <td className="px-4 py-3">
                        {((channel.revenue / 2000000) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SalesDashboard;