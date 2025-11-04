import { LucideIcon } from "lucide-react";

interface QuickStatProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function QuickStat({
  label,
  value,
  icon: Icon,
  color,
  trend,
}: QuickStatProps) {
  return (
    <div className="bg-white rounded-lg p-4 border-2 border-gray-100 hover:border-blue-300 transition-all">
      <div className="flex items-center justify-between mb-2">
        <div
          className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        {trend && (
          <span
            className={`text-sm font-semibold ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "↑" : "↓"} {trend.value}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}
