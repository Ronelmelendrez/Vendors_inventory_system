import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Boxes } from "lucide-react";
import { QuickStat } from "./QuickStat";

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      <QuickStat
        label="Total Products"
        value={totalProducts}
        icon={Package}
        color="bg-blue-600"
        trend={{ value: 12, isPositive: true }}
      />
      <QuickStat
        label="Total Sales"
        value={totalSales}
        icon={ShoppingCart}
        color="bg-green-600"
        trend={{ value: 8, isPositive: true }}
      />
      <QuickStat
        label="Customers"
        value={totalCustomers}
        icon={Users}
        color="bg-purple-600"
        trend={{ value: 5, isPositive: true }}
      />
      <QuickStat
        label="Revenue"
        value={`$${totalRevenue.toLocaleString()}`}
        icon={DollarSign}
        color="bg-green-600"
        trend={{ value: 15, isPositive: true }}
      />
      <QuickStat
        label="Growth"
        value="23%"
        icon={TrendingUp}
        color="bg-orange-600"
        trend={{ value: 3, isPositive: true }}
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
