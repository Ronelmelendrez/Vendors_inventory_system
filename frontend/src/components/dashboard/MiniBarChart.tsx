"use client";

interface BarChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  height?: number;
}

export function MiniBarChart({ data, height = 40 }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div className="flex items-end justify-between gap-1 h-full">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t relative overflow-hidden">
              <div
                className="transition-all duration-500 rounded-t"
                style={{
                  height: `${(item.value / maxValue) * height}px`,
                  backgroundColor: item.color || 'rgb(59, 130, 246)',
                }}
              />
            </div>
            {item.label && (
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate w-full text-center">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
