import { Package, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

interface StatsGridProps {
  totalProducts: number;
  totalSales: number;
}

export function StatsGrid({ totalProducts, totalSales }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Products"
        value={totalProducts.toString()}
        icon={<Package className="h-6 w-6 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatCard
        title="Total Sales"
        value={`$${totalSales.toFixed(2)}`}
        icon={<DollarSign className="h-6 w-6 text-green-600" />}
        bgColor="bg-green-50"
      />
      <StatCard
        title="Transactions"
        value={totalProducts.toString()}
        icon={<ShoppingCart className="h-6 w-6 text-purple-600" />}
        bgColor="bg-purple-50"
      />
      <StatCard
        title="Inventory Value"
        value={`$${totalSales.toFixed(2)}`}
        icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
        bgColor="bg-orange-50"
      />
    </div>
  );
}
