"use client";

import { LucideIcon, AlertTriangle, Package, TrendingDown, AlertCircle } from "lucide-react";

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
  // Get urgency level based on stock percentage
  const getUrgencyLevel = (stock: number, threshold: number) => {
    const percentage = (stock / threshold) * 100;
    if (percentage < 15) return { label: "Critical", color: "bg-red-600", text: "text-red-600 dark:text-red-400", icon: AlertCircle };
    if (percentage < 30) return { label: "Urgent", color: "bg-orange-500", text: "text-orange-600 dark:text-orange-400", icon: AlertTriangle };
    return { label: "Low", color: "bg-yellow-500", text: "text-yellow-600 dark:text-yellow-400", icon: TrendingDown };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Alert pulse background */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl animate-pulse"></div>
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className={`${color} p-2 rounded-lg`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {totalLowStock}
            </div>
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 animate-pulse" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Items require immediate attention
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const percentage = (item.stock / item.threshold) * 100;
            const urgency = getUrgencyLevel(item.stock, item.threshold);
            const UrgencyIcon = urgency.icon;

            return (
              <div key={index} className="space-y-1.5 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Package className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700 dark:text-gray-300 font-medium truncate">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${urgency.text}`}>
                      {item.stock}/{item.threshold}
                    </span>
                    <UrgencyIcon className={`h-3 w-3 ${urgency.text}`} />
                  </div>
                </div>
                
                {/* Progress bar with gradient */}
                <div className="relative w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${urgency.color} relative overflow-hidden`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  >
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                
                {/* Urgency label */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${urgency.text}`}>
                    {urgency.label}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {percentage.toFixed(0)}% remaining
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {totalLowStock > items.length && (
          <div className="mt-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400 font-medium">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>+{totalLowStock - items.length} more items need restocking</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
