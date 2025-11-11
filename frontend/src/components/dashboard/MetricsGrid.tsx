import { Package, ShoppingCart, Users, DollarSign, Boxes } from "lucide-react";
import { QuickStat } from "./QuickStat";
import { ChartStat } from "./ChartStat";

interface MetricsGridProps {
  totalProducts?: number;
  totalSales?: number;
  totalCustomers?: number;
  totalRevenue?: number;
}

export function MetricsGrid({
  totalProducts = 156,
  totalSales = 1243,
  totalCustomers = 523,
  totalRevenue = 87450,
}: MetricsGridProps) {
  // Generate sample chart data (last 7 days)
  const productsChartData = [
    { value: 142 },
    { value: 145 },
    { value: 148 },
    { value: 151 },
    { value: 153 },
    { value: 154 },
    { value: totalProducts },
  ];

  const salesChartData = [
    { value: 1098 },
    { value: 1125 },
    { value: 1156 },
    { value: 1189 },
    { value: 1205 },
    { value: 1224 },
    { value: totalSales },
  ];

  const revenueChartData = [
    { value: 76000 },
    { value: 78500 },
    { value: 81200 },
    { value: 83800 },
    { value: 85100 },
    { value: 86300 },
    { value: totalRevenue },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
      <ChartStat
        label="Total Products"
        value={totalProducts}
        icon={Package}
        color="bg-blue-600"
        chartData={productsChartData}
        trend={{ value: 12, isPositive: true }}
      />
      <ChartStat
        label="Total Sales"
        value={totalSales}
        icon={ShoppingCart}
        color="bg-green-600"
        chartData={salesChartData}
        trend={{ value: 8, isPositive: true }}
      />
      <QuickStat
        label="Customers"
        value={totalCustomers}
        icon={Users}
        color="bg-purple-600"
        trend={{ value: 5, isPositive: true }}
      />
      <ChartStat
        label="Revenue"
        value={`$${totalRevenue.toLocaleString()}`}
        icon={DollarSign}
        color="bg-green-600"
        chartData={revenueChartData}
        trend={{ value: 15, isPositive: true }}
      />
      <QuickStat
        label="Low Stock"
        value="4"
        icon={Boxes}
        color="bg-red-600"
        trend={{ value: 2, isPositive: false }}
      />
    </div>
  );
}
