"use client";

import { 
  ShoppingCart, 
  Building2, 
  Boxes, 
  Grid3x3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Crown,
  Award,
  Target,
  AlertTriangle,
  Package,
  AlertCircle,
  BarChart3,
  LucideIcon
} from "lucide-react";
import { useState, useEffect } from "react";

// ========== AREA CHART COMPONENT ==========
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

function AreaChart({ 
  data, 
  color = "rgb(34, 197, 94)",
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

  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((point.value - minValue) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const areaPath = `
    M ${padding},${height - padding}
    L ${points.split(' ')[0]}
    L ${points}
    L ${width - padding},${height - padding}
    Z
  `;

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
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
        
        <defs>
          <linearGradient id={`areaGradient-${color.replace(/[^a-z0-9]/gi, '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.4 }} />
            <stop offset="50%" style={{ stopColor: color, stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>

        <path d={areaPath} fill={`url(#areaGradient-${color.replace(/[^a-z0-9]/gi, '')})`} />
        <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {data.map((point, index) => {
          const x = padding + (index / (data.length - 1)) * (width - padding * 2);
          const y = height - padding - ((point.value - minValue) / range) * (height - padding * 2);
          const isHovered = hoveredIndex === index;
          
          return (
            <g key={index}>
              <rect x={x - 10} y={0} width={20} height={height} fill="transparent"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              />
              <circle cx={x} cy={y} r={isHovered ? 4.5 : 3} fill="white" stroke={color}
                strokeWidth={isHovered ? 2.5 : 2}
                className="transition-all duration-200 dark:fill-gray-800"
              />
              {showTooltip && isHovered && (
                <>
                  <rect x={x - 25} y={y - 35} width={50} height={24} rx={4}
                    fill="rgb(17, 24, 39)" className="dark:fill-gray-700"
                  />
                  <text x={x} y={y - 22} textAnchor="middle"
                    className="text-xs font-semibold fill-white" style={{ fontSize: '10px' }}>
                    {point.value.toLocaleString()}
                  </text>
                  <text x={x} y={y - 13} textAnchor="middle"
                    className="text-xs fill-gray-300" style={{ fontSize: '8px' }}>
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

// ========== PROGRESS RING COMPONENT ==========
interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  animated?: boolean;
  showGlow?: boolean;
}

function ProgressRing({ 
  percentage, 
  size = 70, 
  strokeWidth = 8,
  color = "rgb(234, 88, 12)",
  label,
  animated = true,
  showGlow = true
}: ProgressRingProps) {
  const [currentPercentage, setCurrentPercentage] = useState(animated ? 0 : percentage);
  
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setCurrentPercentage(percentage), 100);
      return () => clearTimeout(timer);
    }
  }, [percentage, animated]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (currentPercentage / 100) * circumference;

  const getColorByPercentage = (pct: number) => {
    if (pct >= 90) return color;
    if (pct >= 70) return "rgb(34, 197, 94)";
    if (pct >= 50) return "rgb(234, 179, 8)";
    return "rgb(239, 68, 68)";
  };

  const ringColor = getColorByPercentage(currentPercentage);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
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
          
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor"
            strokeWidth={strokeWidth} className="text-gray-200 dark:text-gray-700" opacity="0.3"
          />
          
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={ringColor}
            strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" className="transition-all duration-1000 ease-out"
            filter={showGlow ? "url(#glow)" : undefined}
            style={{ filter: showGlow ? `drop-shadow(0 0 4px ${ringColor})` : undefined }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {Math.round(currentPercentage)}%
          </span>
          {label && (
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ========== MINI BAR CHART COMPONENT ==========
interface BarChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  height?: number;
  showValues?: boolean;
  animated?: boolean;
}

function MiniBarChart({ 
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
      <div style={{ height: `${height}px` }} className="flex items-end justify-between gap-1.5">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * height;
          const isHovered = hoveredIndex === index;
          const percentage = ((item.value / totalValue) * 100).toFixed(1);

          return (
            <div key={index} className="relative flex-1 flex flex-col items-center justify-end group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}>
              
              {showValues && isHovered && (
                <div className="absolute bottom-full mb-1 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded whitespace-nowrap z-10 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {item.value} ({percentage}%)
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                </div>
              )}
              
              <div className="relative w-full flex flex-col items-center">
                <div className={`w-full rounded-t transition-all duration-500 relative overflow-hidden ${
                    isHovered ? 'opacity-100' : 'opacity-90'
                  }`}
                  style={{
                    height: animated ? `${barHeight}px` : `${barHeight}px`,
                    backgroundColor: item.color || 'rgb(59, 130, 246)',
                    transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)',
                    transformOrigin: 'bottom',
                    boxShadow: isHovered ? `0 0 8px ${item.color}40` : 'none'
                  }}>
                  <div className="absolute inset-0 bg-linear-to-t from-transparent to-white opacity-20"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between gap-1.5">
        {data.map((item, index) => (
          <div key={index} className="flex-1 text-center">
            <span className="text-xs text-gray-600 dark:text-gray-400 truncate block">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-1 mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
              <span className="text-gray-600 dark:text-gray-400 truncate">{item.label}</span>
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

// ========== MONTHLY METRIC COMPONENT ==========
interface MonthlyMetricProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  monthlyData: Array<{ month: string; value: number }>;
  subtitle?: string;
}

function MonthlyMetric({ label, value, icon: Icon, color, monthlyData, subtitle }: MonthlyMetricProps) {
  const colorMap: Record<string, string> = {
    "bg-blue-600": "rgb(37, 99, 235)",
    "bg-green-600": "rgb(34, 197, 94)",
    "bg-purple-600": "rgb(147, 51, 234)",
    "bg-orange-600": "rgb(234, 88, 12)",
  };

  const chartColor = colorMap[color] || "rgb(34, 197, 94)";
  const currentValue = monthlyData[monthlyData.length - 1]?.value || 0;
  const previousValue = monthlyData[monthlyData.length - 2]?.value || 0;
  const trend = previousValue > 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0;
  const isPositiveTrend = trend >= 0;
  const average = monthlyData.reduce((sum, d) => sum + d.value, 0) / monthlyData.length;
  const isAboveAverage = currentValue > average;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-green-500/5 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`${color} p-2 rounded-lg`}>
              <Icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 block">{label}</span>
              {subtitle && <span className="text-xs text-gray-500 dark:text-gray-500">{subtitle}</span>}
            </div>
          </div>
          <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>
        
        <div className="mb-4 space-y-2">
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
            {trend !== 0 && (
              <div className={`flex items-center gap-1 text-sm font-semibold ${
                isPositiveTrend ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {isPositiveTrend ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                <span>{Math.abs(trend).toFixed(1)}%</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500 dark:text-gray-400">Avg: {average.toFixed(0)}</span>
            <span className={`font-semibold ${
              isAboveAverage ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
            }`}>
              {isAboveAverage ? '↑ Above average' : '↓ Below average'}
            </span>
          </div>
        </div>

        <AreaChart data={monthlyData} color={chartColor} showGrid={true} height={60} showTooltip={true} />
        
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

// ========== TOP BRANCH METRIC COMPONENT ==========
interface TopBranchMetricProps {
  label: string;
  icon: LucideIcon;
  branchName: string;
  performance: number;
  sales: number;
  color?: string;
}

function TopBranchMetric({ label, icon: Icon, branchName, performance, sales, color = "bg-orange-600" }: TopBranchMetricProps) {
  const colorMap: Record<string, string> = {
    "bg-orange-600": "rgb(234, 88, 12)",
    "bg-blue-600": "rgb(37, 99, 235)",
    "bg-green-600": "rgb(34, 197, 94)",
    "bg-purple-600": "rgb(147, 51, 234)",
  };

  const ringColor = colorMap[color] || "rgb(234, 88, 12)";

  const getPerformanceRank = (score: number) => {
    if (score >= 90) return { label: "Excellent", color: "text-emerald-600 dark:text-emerald-400" };
    if (score >= 75) return { label: "Great", color: "text-green-600 dark:text-green-400" };
    if (score >= 60) return { label: "Good", color: "text-blue-600 dark:text-blue-400" };
    return { label: "Average", color: "text-yellow-600 dark:text-yellow-400" };
  };

  const rank = getPerformanceRank(performance);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-orange-500/5 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className={`${color} p-2 rounded-lg`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
        </div>
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500 shrink-0" />
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">{branchName}</div>
            </div>
            
            <div className="flex items-center gap-2">
              <Award className={`h-4 w-4 ${rank.color}`} />
              <span className={`text-sm font-semibold ${rank.color}`}>{rank.label} Performance</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
              <div>
                <span className="font-bold text-gray-900 dark:text-gray-100">{sales.toLocaleString()}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">total sales</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
              <Target className="h-3 w-3" />
              <span>Performance Leader</span>
            </div>
          </div>
          
          <div className="shrink-0">
            <ProgressRing percentage={performance} size={75} strokeWidth={8} color={ringColor} animated={true} showGlow={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== LOW STOCK METRIC COMPONENT ==========
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

function LowStockMetric({ label, icon: Icon, totalLowStock, items, color = "bg-red-600" }: LowStockMetricProps) {
  const getUrgencyLevel = (stock: number, threshold: number) => {
    const percentage = (stock / threshold) * 100;
    if (percentage < 15) return { label: "Critical", color: "bg-red-600", text: "text-red-600 dark:text-red-400", icon: AlertCircle };
    if (percentage < 30) return { label: "Urgent", color: "bg-orange-500", text: "text-orange-600 dark:text-orange-400", icon: AlertTriangle };
    return { label: "Low", color: "bg-yellow-500", text: "text-yellow-600 dark:text-yellow-400", icon: TrendingDown };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl animate-pulse"></div>
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className={`${color} p-2 rounded-lg`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">{totalLowStock}</div>
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 animate-pulse" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Items require immediate attention</p>
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
                    <Package className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <span className="text-xs text-gray-700 dark:text-gray-300 font-medium truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${urgency.text}`}>{item.stock}/{item.threshold}</span>
                    <UrgencyIcon className={`h-3 w-3 ${urgency.text}`} />
                  </div>
                </div>
                
                <div className="relative w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${urgency.color} relative overflow-hidden`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}>
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${urgency.text}`}>{urgency.label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{percentage.toFixed(0)}% remaining</span>
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

// ========== CATEGORY METRIC COMPONENT ==========
interface CategoryMetricProps {
  label: string;
  icon: LucideIcon;
  categories: Array<{ label: string; value: number; color?: string }>;
  totalValue?: string | number;
}

function CategoryMetric({ label, icon: Icon, categories, totalValue }: CategoryMetricProps) {
  const topCategory = categories.reduce((max, cat) => cat.value > max.value ? cat : max, categories[0]);
  const totalSum = categories.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-500/5 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Icon className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
          </div>
          <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        </div>
        
        <div className="mb-4 space-y-2">
          {totalValue && (
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalValue}</div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
            <span className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-gray-100">{topCategory.label}</span> leading with{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {((topCategory.value / totalSum) * 100).toFixed(1)}%
              </span>
            </span>
          </div>
        </div>

        <MiniBarChart data={categories} height={50} showValues={true} animated={true} />
      </div>
    </div>
  );
}

// ========== MAIN METRICS GRID ==========
interface MetricsGridProps {
  monthlySales?: number;
}

export function MetricsGrid({ monthlySales = 1243 }: MetricsGridProps) {
  const monthlySalesData = [
    { month: "Jun", value: 892 },
    { month: "Jul", value: 1045 },
    { month: "Aug", value: 978 },
    { month: "Sep", value: 1156 },
    { month: "Oct", value: 1089 },
    { month: "Nov", value: monthlySales },
  ];

  const topBranch = {
    name: "Main Branch",
    performance: 94,
    sales: 3847,
  };

  const lowStockItems = [
    { name: "Widget Pro", stock: 3, threshold: 20 },
    { name: "Gadget Plus", stock: 5, threshold: 25 },
    { name: "Tool Kit", stock: 2, threshold: 15 },
  ];

  const categorySales = [
    { label: "Electronics", value: 342, color: "rgb(59, 130, 246)" },
    { label: "Furniture", value: 289, color: "rgb(147, 51, 234)" },
    { label: "Clothing", value: 256, color: "rgb(236, 72, 153)" },
    { label: "Food", value: 198, color: "rgb(34, 197, 94)" },
    { label: "Books", value: 158, color: "rgb(234, 88, 12)" },
  ];

  const totalCategorySales = categorySales.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MonthlyMetric
        label="Monthly Sales"
        value={monthlySales.toLocaleString()}
        icon={ShoppingCart}
        color="bg-green-600"
        monthlyData={monthlySalesData}
        subtitle="Last 6 months trend"
      />

      <TopBranchMetric
        label="Top Branch"
        icon={Building2}
        branchName={topBranch.name}
        performance={topBranch.performance}
        sales={topBranch.sales}
        color="bg-orange-600"
      />

      <LowStockMetric
        label="Low Stock Alerts"
        icon={Boxes}
        totalLowStock={lowStockItems.length}
        items={lowStockItems}
        color="bg-red-600"
      />

      <CategoryMetric
        label="Category Sales"
        icon={Grid3x3}
        categories={categorySales}
        totalValue={totalCategorySales.toLocaleString()}
      />
    </div>
  );
}
