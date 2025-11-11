"use client";

import { LucideIcon, TrendingUp, BarChart3 } from "lucide-react";
import { MiniBarChart } from "./MiniBarChart";

interface CategoryMetricProps {
  label: string;
  icon: LucideIcon;
  categories: Array<{ label: string; value: number; color?: string }>;
  totalValue?: string | number;
}

export function CategoryMetric({
  label,
  icon: Icon,
  categories,
  totalValue,
}: CategoryMetricProps) {
  // Find top performing category
  const topCategory = categories.reduce((max, cat) => 
    cat.value > max.value ? cat : max, categories[0]
  );

  const totalSum = categories.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Icon className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {label}
            </span>
          </div>
          <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        </div>
        
        {/* Total value and top category */}
        <div className="mb-4 space-y-2">
          {totalValue && (
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {totalValue}
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
            <span className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {topCategory.label}
              </span> leading with{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {((topCategory.value / totalSum) * 100).toFixed(1)}%
              </span>
            </span>
          </div>
        </div>

        {/* Bar chart */}
        <MiniBarChart 
          data={categories} 
          height={50}
          showValues={true}
          animated={true}
        />
      </div>
    </div>
  );
}
