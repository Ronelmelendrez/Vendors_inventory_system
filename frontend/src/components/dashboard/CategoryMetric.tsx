"use client";

import { LucideIcon } from "lucide-react";
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
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-purple-600 p-2 rounded-lg">
          <Icon className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </span>
      </div>
      
      {totalValue && (
        <div className="mb-3">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {totalValue}
          </div>
        </div>
      )}

      <MiniBarChart data={categories} height={35} />
      
      <div className="mt-3 space-y-1">
        {categories.slice(0, 3).map((cat, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: cat.color || 'rgb(147, 51, 234)' }}
              />
              <span className="text-gray-600 dark:text-gray-400">{cat.label}</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">{cat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
