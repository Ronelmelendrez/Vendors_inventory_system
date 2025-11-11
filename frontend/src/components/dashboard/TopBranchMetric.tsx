"use client";

import { LucideIcon, TrendingUp, Crown, Award, Target } from "lucide-react";
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

  // Get performance rank based on score
  const getPerformanceRank = (score: number) => {
    if (score >= 90)
      return {
        label: "Excellent",
        color: "text-emerald-600 dark:text-emerald-400",
      };
    if (score >= 75)
      return { label: "Great", color: "text-green-600 dark:text-green-400" };
    if (score >= 60)
      return { label: "Good", color: "text-blue-600 dark:text-blue-400" };
    return { label: "Average", color: "text-yellow-600 dark:text-yellow-400" };
  };

  const rank = getPerformanceRank(performance);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-2xl"></div>

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className={`${color} p-2 rounded-lg`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Branch name with crown */}
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500 flex-shrink-0" />
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
                {branchName}
              </div>
            </div>

            {/* Performance rank badge */}
            <div className="flex items-center gap-2">
              <Award className={`h-4 w-4 ${rank.color}`} />
              <span className={`text-sm font-semibold ${rank.color}`}>
                {rank.label} Performance
              </span>
            </div>

            {/* Sales stat */}
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  {sales.toLocaleString()}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">
                  total sales
                </span>
              </div>
            </div>

            {/* Target indicator */}
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
              <Target className="h-3 w-3" />
              <span>Performance Leader</span>
            </div>
          </div>

          {/* Progress Ring */}
          <div className="flex-shrink-0">
            <ProgressRing
              percentage={performance}
              size={75}
              strokeWidth={8}
              color={ringColor}
              animated={true}
              showGlow={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
