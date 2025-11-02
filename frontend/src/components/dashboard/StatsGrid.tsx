import { Package, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

interface StatsGridProps {
  totalProducts: number;
  totalSales: number;
}

export function StatsGrid({ totalProducts, totalSales }: StatsGridProps) {
  // Calculate additional metrics
  const averageSale = totalSales / Math.max(totalProducts, 1);
  const growthRate = 15.5; // Mock growth rate

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
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
        title="Average Sale"
        value={`$${averageSale.toFixed(2)}`}
        icon={<ShoppingCart className="h-6 w-6 text-purple-600" />}
        bgColor="bg-purple-50"
      />
      <StatCard
        title="Growth Rate"
        value={`${growthRate}%`}
        icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
        bgColor="bg-orange-50"
      />
    </div>
  );
}
