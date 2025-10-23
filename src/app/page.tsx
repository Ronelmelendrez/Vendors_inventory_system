import { Package, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Vendor Management System
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Products"
            value="0"
            icon={<Package className="h-6 w-6 text-blue-600" />}
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Total Sales"
            value="$0.00"
            icon={<DollarSign className="h-6 w-6 text-green-600" />}
            bgColor="bg-green-50"
          />
          <StatCard
            title="Transactions"
            value="0"
            icon={<ShoppingCart className="h-6 w-6 text-purple-600" />}
            bgColor="bg-purple-50"
          />
          <StatCard
            title="Inventory Value"
            value="$0.00"
            icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
            bgColor="bg-orange-50"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionButton text="Add Product" />
            <ActionButton text="Record Sale" />
            <ActionButton text="Record Return" />
            <ActionButton text="View Reports" />
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Welcome to Your Vendor Management System
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Manage your inventory, track sales, monitor vendor performance, and
            generate insightful reports all in one place.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  bgColor,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className={`p-2 rounded-lg ${bgColor}`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function ActionButton({ text }: { text: string }) {
  return (
    <button className="px-4 py-3 bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors">
      {text}
    </button>
  );
}
