import { ShoppingCart, Building2, Boxes, Grid3x3 } from "lucide-react";
import { MonthlyMetric } from "./MonthlyMetric";
import { TopBranchMetric } from "./TopBranchMetric";
import { LowStockMetric } from "./LowStockMetric";
import { CategoryMetric } from "./CategoryMetric";

interface MetricsGridProps {
  monthlySales?: number;
}

export function MetricsGrid({ monthlySales = 1243 }: MetricsGridProps) {
  // Monthly sales data (last 6 months)
  const monthlySalesData = [
    { month: "Jun", value: 892 },
    { month: "Jul", value: 1045 },
    { month: "Aug", value: 978 },
    { month: "Sep", value: 1156 },
    { month: "Oct", value: 1089 },
    { month: "Nov", value: monthlySales },
  ];

  // Top performing branch data
  const topBranch = {
    name: "Main Branch",
    performance: 94,
    sales: 3847,
  };

  // Low stock items
  const lowStockItems = [
    { name: "Widget Pro", stock: 3, threshold: 20 },
    { name: "Gadget Plus", stock: 5, threshold: 25 },
    { name: "Tool Kit", stock: 2, threshold: 15 },
  ];

  // Category sales data
  const categorySales = [
    { label: "Electronics", value: 342, color: "rgb(59, 130, 246)" }, // blue
    { label: "Furniture", value: 289, color: "rgb(147, 51, 234)" }, // purple
    { label: "Clothing", value: 256, color: "rgb(236, 72, 153)" }, // pink
    { label: "Food", value: 198, color: "rgb(34, 197, 94)" }, // green
    { label: "Books", value: 158, color: "rgb(234, 88, 12)" }, // orange
  ];

  const totalCategorySales = categorySales.reduce(
    (sum, cat) => sum + cat.value,
    0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Monthly Sales with Area Chart */}
      <MonthlyMetric
        label="Monthly Sales"
        value={monthlySales.toLocaleString()}
        icon={ShoppingCart}
        color="bg-green-600"
        monthlyData={monthlySalesData}
        subtitle="Last 6 months trend"
      />

      {/* Top Branch with Progress Ring */}
      <TopBranchMetric
        label="Top Branch"
        icon={Building2}
        branchName={topBranch.name}
        performance={topBranch.performance}
        sales={topBranch.sales}
        color="bg-orange-600"
      />

      {/* Low Stock with Progress Bars */}
      <LowStockMetric
        label="Low Stock Alerts"
        icon={Boxes}
        totalLowStock={lowStockItems.length}
        items={lowStockItems}
        color="bg-red-600"
      />

      {/* Category Sales with Bar Chart */}
      <CategoryMetric
        label="Category Sales"
        icon={Grid3x3}
        categories={categorySales}
        totalValue={totalCategorySales.toLocaleString()}
      />
    </div>
  );
}
