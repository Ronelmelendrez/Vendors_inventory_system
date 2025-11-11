"use client";

import { LucideIcon } from "lucide-react";
import { AreaChart } from "./AreaChart";

interface MonthlyMetricProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  monthlyData: Array<{ month: string; value: number }>;
  subtitle?: string;
}

export function MonthlyMetric({
  label,
  value,
  icon: Icon,
  color,
  monthlyData,
  subtitle,
}: MonthlyMetricProps) {
  const colorMap: Record<string, string> = {
    "bg-blue-600": "rgb(37, 99, 235)",
    "bg-green-600": "rgb(34, 197, 94)",
    "bg-purple-600": "rgb(147, 51, 234)",
    "bg-orange-600": "rgb(234, 88, 12)",
  };

  const chartColor = colorMap[color] || "rgb(34, 197, 94)";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <div className={`${color} p-2 rounded-lg`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
          </span>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>
      
      <div className="mb-3">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </div>
      </div>

      <AreaChart data={monthlyData} color={chartColor} />
      
      <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
        <span>{monthlyData[0]?.month}</span>
        <span>{monthlyData[monthlyData.length - 1]?.month}</span>
      </div>
    </div>
  );
}
