"use client";

import { useState, useEffect } from "react";

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  animated?: boolean;
  showGlow?: boolean;
}

export function ProgressRing({ 
  percentage, 
  size = 70, 
  strokeWidth = 8,
  color = "rgb(234, 88, 12)", // orange-600
  label,
  animated = true,
  showGlow = true
}: ProgressRingProps) {
  const [currentPercentage, setCurrentPercentage] = useState(animated ? 0 : percentage);
  
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setCurrentPercentage(percentage);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [percentage, animated]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (currentPercentage / 100) * circumference;

  // Determine color based on percentage
  const getColorByPercentage = (pct: number) => {
    if (pct >= 90) return color; // Excellent
    if (pct >= 70) return "rgb(34, 197, 94)"; // Good - green
    if (pct >= 50) return "rgb(234, 179, 8)"; // Average - yellow
    return "rgb(239, 68, 68)"; // Poor - red
  };

  const ringColor = getColorByPercentage(currentPercentage);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Glow effect */}
          {showGlow && (
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          )}
          
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-700"
            opacity="0.3"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            filter={showGlow ? "url(#glow)" : undefined}
            style={{
              filter: showGlow ? `drop-shadow(0 0 4px ${ringColor})` : undefined
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {Math.round(currentPercentage)}%
          </span>
          {label && (
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
