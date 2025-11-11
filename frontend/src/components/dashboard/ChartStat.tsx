"use client";

import { LucideIcon } from "lucide-react";
import { MiniChart } from "./MiniChart";

interface ChartStatProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  chartData: Array<{ value: number; label?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function ChartStat({
  label,
  value,
  icon: Icon,
  color,
  chartData,
  trend,
}: ChartStatProps) {
  // Extract RGB values from Tailwind color classes
  const colorMap: Record<string, string> = {
    "bg-blue-600": "rgb(37, 99, 235)",
    "bg-green-600": "rgb(22, 163, 74)",
    "bg-purple-600": "rgb(147, 51, 234)",
    "bg-red-600": "rgb(220, 38, 38)",
    "bg-orange-600": "rgb(234, 88, 12)",
  };

  const chartColor = colorMap[color] || "rgb(59, 130, 246)";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`${color} p-2 rounded-lg`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
          </span>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </div>
      </div>

      <MiniChart 
        data={chartData} 
        color={chartColor}
        trend={trend}
      />
    </div>
  );
}
