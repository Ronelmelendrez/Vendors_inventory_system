"use client";

import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

interface StatItem {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  trend?: "up" | "down";
}

export function ProfileStats() {
  const stats: StatItem[] = [
    {
      label: "Total Products",
      value: "0",
      icon: Package,
      change: "+0%",
      trend: "up",
    },
    {
      label: "Total Sales",
      value: "0",
      icon: ShoppingCart,
      change: "+0%",
      trend: "up",
    },
    {
      label: "Revenue",
      value: "$0",
      icon: DollarSign,
      change: "+0%",
      trend: "up",
    },
    {
      label: "Growth",
      value: "0%",
      icon: TrendingUp,
      change: "+0%",
      trend: "up",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Activity Overview
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border dark:border-gray-600"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              {stat.change && (
                <span
                  className={`text-xs font-medium ${
                    stat.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
