"use client";

import { LucideIcon, TrendingUp, TrendingDown, Calendar } from "lucide-react";
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

  // Calculate trend
  const currentValue = monthlyData[monthlyData.length - 1]?.value || 0;
  const previousValue = monthlyData[monthlyData.length - 2]?.value || 0;
  const trend = previousValue > 0 
    ? ((currentValue - previousValue) / previousValue) * 100 
    : 0;
  const isPositiveTrend = trend >= 0;

  // Calculate average
  const average = monthlyData.reduce((sum, d) => sum + d.value, 0) / monthlyData.length;
  const isAboveAverage = currentValue > average;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/5 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`${color} p-2 rounded-lg`}>
              <Icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 block">
                {label}
              </span>
              {subtitle && (
                <span className="text-xs text-gray-500 dark:text-gray-500">{subtitle}</span>
              )}
            </div>
          </div>
          <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>
        
        {/* Value and trend */}
        <div className="mb-4 space-y-2">
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {value}
            </div>
            {trend !== 0 && (
              <div className={`flex items-center gap-1 text-sm font-semibold ${
                isPositiveTrend 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {isPositiveTrend ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                <span>{Math.abs(trend).toFixed(1)}%</span>
              </div>
            )}
          </div>
          
          {/* Average indicator */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500 dark:text-gray-400">
              Avg: {average.toFixed(0)}
            </span>
            <span className={`font-semibold ${
              isAboveAverage 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {isAboveAverage ? '↑ Above average' : '↓ Below average'}
            </span>
          </div>
        </div>

        {/* Area chart */}
        <AreaChart 
          data={monthlyData} 
          color={chartColor}
          showGrid={true}
          height={60}
          showTooltip={true}
        />
        
        {/* Month range */}
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>{monthlyData[0]?.month}</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {monthlyData[monthlyData.length - 1]?.month}
          </span>
        </div>
      </div>
    </div>
  );
}
