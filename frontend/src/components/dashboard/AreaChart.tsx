"use client";

import { useState } from "react";

interface MonthlyDataPoint {
  month: string;
  value: number;
}

interface AreaChartProps {
  data: MonthlyDataPoint[];
  color?: string;
  showGrid?: boolean;
  height?: number;
  showTooltip?: boolean;
}

export function AreaChart({ 
  data, 
  color = "rgb(34, 197, 94)", // green-600
  showGrid = true,
  height = 60,
  showTooltip = true
}: AreaChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const width = 120;
  const padding = 8;

  // Calculate points for the line
  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((point.value - minValue) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  // Create smooth path for area
  const areaPath = `
    M ${padding},${height - padding}
    L ${points.split(' ')[0]}
    L ${points}
    L ${width - padding},${height - padding}
    Z
  `;

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {showGrid && (
          <g className="text-gray-200 dark:text-gray-700">
            {[0.25, 0.5, 0.75].map((factor) => (
              <line
                key={factor}
                x1={padding}
                y1={padding + (height - padding * 2) * factor}
                x2={width - padding}
                y2={padding + (height - padding * 2) * factor}
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.3"
                strokeDasharray="2,2"
              />
            ))}
          </g>
        )}
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id={`areaGradient-${color.replace(/[^a-z0-9]/gi, '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.4 }} />
            <stop offset="50%" style={{ stopColor: color, stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path
          d={areaPath}
          fill={`url(#areaGradient-${color.replace(/[^a-z0-9]/gi, '')})`}
        />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Interactive points */}
        {data.map((point, index) => {
          const x = padding + (index / (data.length - 1)) * (width - padding * 2);
          const y = height - padding - ((point.value - minValue) / range) * (height - padding * 2);
          const isHovered = hoveredIndex === index;
          
          return (
            <g key={index}>
              {/* Hover area */}
              <rect
                x={x - 10}
                y={0}
                width={20}
                height={height}
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              />
              {/* Data point */}
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 4.5 : 3}
                fill="white"
                stroke={color}
                strokeWidth={isHovered ? 2.5 : 2}
                className="transition-all duration-200 dark:fill-gray-800"
              />
              {/* Tooltip */}
              {showTooltip && isHovered && (
                <>
                  <rect
                    x={x - 25}
                    y={y - 35}
                    width={50}
                    height={24}
                    rx={4}
                    fill="rgb(17, 24, 39)"
                    className="dark:fill-gray-700"
                  />
                  <text
                    x={x}
                    y={y - 22}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-white"
                    style={{ fontSize: '10px' }}
                  >
                    {point.value.toLocaleString()}
                  </text>
                  <text
                    x={x}
                    y={y - 13}
                    textAnchor="middle"
                    className="text-xs fill-gray-300"
                    style={{ fontSize: '8px' }}
                  >
                    {point.month}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
