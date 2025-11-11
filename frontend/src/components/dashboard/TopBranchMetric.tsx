"use client";

import { LucideIcon, TrendingUp, Crown } from "lucide-react";
import { ProgressRing } from "./ProgressRing";

interface TopBranchMetricProps {
  label: string;
  icon: LucideIcon;
  branchName: string;
  performance: number;
  sales: number;
  color?: string;
}

export function TopBranchMetric({
  label,
  icon: Icon,
  branchName,
  performance,
  sales,
  color = "bg-orange-600",
}: TopBranchMetricProps) {
  const colorMap: Record<string, string> = {
    "bg-orange-600": "rgb(234, 88, 12)",
    "bg-blue-600": "rgb(37, 99, 235)",
    "bg-green-600": "rgb(34, 197, 94)",
    "bg-purple-600": "rgb(147, 51, 234)",
  };

  const ringColor = colorMap[color] || "rgb(234, 88, 12)";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <div className={`${color} p-2 rounded-lg`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Crown className="h-4 w-4 text-yellow-500" />
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {branchName}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
              <span className="text-gray-600 dark:text-gray-400">
                {sales.toLocaleString()} sales
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              Performance Leader
            </div>
          </div>
        </div>
        
        <ProgressRing 
          percentage={performance} 
          size={70}
          strokeWidth={6}
          color={ringColor}
        />
      </div>
    </div>
  );
}
