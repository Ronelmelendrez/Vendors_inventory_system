interface SalesChartProps {
  data?: { month: string; sales: number }[];
}

const defaultData = [
  { month: "Jan", sales: 4200 },
  { month: "Feb", sales: 3800 },
  { month: "Mar", sales: 5100 },
  { month: "Apr", sales: 4600 },
  { month: "May", sales: 6200 },
  { month: "Jun", sales: 5800 },
];

export function SalesChart({ data = defaultData }: SalesChartProps) {
  const maxSales = Math.max(...data.map(d => d.sales));

  return (
    <div className="bg-white rounded-lg border-2 border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Sales Overview</h3>
      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = (item.sales / maxSales) * 100;
          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{item.month}</span>
                <span className="text-sm font-bold text-gray-900">${item.sales.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
