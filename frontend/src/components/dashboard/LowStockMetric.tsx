"use client";

import { LucideIcon, AlertTriangle, Package } from "lucide-react";

interface LowStockItem {
  name: string;
  stock: number;
  threshold: number;
}

interface LowStockMetricProps {
  label: string;
  icon: LucideIcon;
  totalLowStock: number;
  items: LowStockItem[];
  color?: string;
}

export function LowStockMetric({
  label,
  icon: Icon,
  totalLowStock,
  items,
  color = "bg-red-600",
}: LowStockMetricProps) {
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
      
      <div className="mb-3">
        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
          {totalLowStock}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
          Items need restocking
        </p>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => {
          const percentage = (item.stock / item.threshold) * 100;
          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <Package className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {item.name}
                  </span>
                </div>
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  {item.stock}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    percentage < 25 
                      ? 'bg-red-600' 
                      : percentage < 50 
                      ? 'bg-orange-500' 
                      : 'bg-yellow-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {totalLowStock > items.length && (
        <div className="mt-2 flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
          <AlertTriangle className="h-3 w-3" />
          <span>+{totalLowStock - items.length} more items</span>
        </div>
      )}
    </div>
  );
}
