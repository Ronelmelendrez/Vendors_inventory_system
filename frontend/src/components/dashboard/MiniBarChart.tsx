"use client";

import { useState } from "react";

interface BarChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  height?: number;
  showValues?: boolean;
  animated?: boolean;
}

export function MiniBarChart({ 
  data, 
  height = 60,
  showValues = true,
  animated = true
}: BarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data.map(d => d.value));
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full space-y-2">
      {/* Bar chart */}
      <div style={{ height: `${height}px` }} className="flex items-end justify-between gap-1.5">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * height;
          const isHovered = hoveredIndex === index;
          const percentage = ((item.value / totalValue) * 100).toFixed(1);

          return (
            <div
              key={index}
              className="relative flex-1 flex flex-col items-center justify-end group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Value tooltip on hover */}
              {showValues && isHovered && (
                <div className="absolute bottom-full mb-1 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded whitespace-nowrap z-10 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {item.value} ({percentage}%)
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                </div>
              )}
              
              {/* Bar */}
              <div className="relative w-full flex flex-col items-center">
                <div
                  className={`w-full rounded-t transition-all duration-500 relative overflow-hidden ${
                    isHovered ? 'opacity-100' : 'opacity-90'
                  }`}
                  style={{
                    height: animated ? `${barHeight}px` : `${barHeight}px`,
                    backgroundColor: item.color || 'rgb(59, 130, 246)',
                    transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)',
                    transformOrigin: 'bottom',
                    boxShadow: isHovered ? `0 0 8px ${item.color}40` : 'none'
                  }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-20"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between gap-1.5">
        {data.map((item, index) => (
          <div key={index} className="flex-1 text-center">
            <span className="text-xs text-gray-600 dark:text-gray-400 truncate block">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Legend with percentages */}
      <div className="grid grid-cols-1 gap-1 mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-600 dark:text-gray-400 truncate">
                {item.label}
              </span>
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {((item.value / totalValue) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
