"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

interface DataPoint {
  value: number;
  label?: string;
}

interface MiniChartProps {
  data: DataPoint[];
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function MiniChart({ 
  data, 
  color = "rgb(59, 130, 246)", // blue-600
  trend 
}: MiniChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  // Calculate points for the line chart
  const width = 100;
  const height = 40;
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((point.value - minValue) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  // Create area path
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <div className="relative w-full h-10">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Area fill */}
        <polygon
          points={areaPoints}
          fill={color}
          opacity="0.1"
        />
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dots */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * width;
          const y = height - ((point.value - minValue) / range) * height;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={color}
              opacity="0.5"
            />
          );
        })}
      </svg>
      {trend && (
        <div className={`absolute top-0 right-0 flex items-center gap-1 text-xs font-medium ${
          trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {trend.isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>{trend.value}%</span>
        </div>
      )}
    </div>
  );
}
