"use client";

import { TrendingUp, TrendingDown, AlertTriangle, Calendar } from "lucide-react";

// ========== TYPES ==========
interface RecentActivity {
  id: number;
  type: "sale" | "stock" | "user";
  message: string;
  timestamp: string;
  amount?: number;
}

interface TopProduct {
  id: number;
  name: string;
  sales: number;
  revenue: number;
  category: string;
}

interface LowStockItem {
  id: number;
  name: string;
  currentStock: number;
  minStock: number;
  category: string;
}

interface SaleEvent {
  id: number;
  title: string;
  date: string;
  type: "upcoming" | "ongoing" | "completed";
}

// ========== RECENT ACTIVITY WIDGET ==========
interface ActivityFeedProps {
  activities?: RecentActivity[];
}

const defaultActivities: RecentActivity[] = [
  {
    id: 1,
    type: "sale",
    message: "New sale: Laptop Pro",
    timestamp: "2 minutes ago",
    amount: 1299,
  },
  {
    id: 2,
    type: "stock",
    message: "Low stock alert: Office Chair",
    timestamp: "15 minutes ago",
  },
  {
    id: 3,
    type: "user",
    message: "New user registered",
    timestamp: "1 hour ago",
  },
  {
    id: 4,
    type: "sale",
    message: "New sale: Desk Lamp",
    timestamp: "2 hours ago",
    amount: 45,
  },
  {
    id: 5,
    type: "stock",
    message: "Stock updated: Notebook Set",
    timestamp: "3 hours ago",
  },
];

export function ActivityFeed({
  activities = defaultActivities,
}: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === "sale"
                  ? "bg-green-100"
                  : activity.type === "stock"
                  ? "bg-orange-100"
                  : "bg-blue-100"
              }`}
            >
              {activity.type === "sale" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : activity.type === "stock" ? (
                <TrendingDown className="h-4 w-4 text-orange-600" />
              ) : (
                <span className="text-blue-600 text-xs font-bold">U</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.message}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
                {activity.amount && (
                  <p className="text-sm font-semibold text-green-600">
                    ${activity.amount}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== TOP PRODUCTS WIDGET ==========
interface TopProductsProps {
  products?: TopProduct[];
}

const defaultProducts: TopProduct[] = [
  {
    id: 1,
    name: "Laptop Pro",
    sales: 45,
    revenue: 58455,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Office Chair",
    sales: 38,
    revenue: 11400,
    category: "Furniture",
  },
  {
    id: 3,
    name: "Desk Lamp",
    sales: 52,
    revenue: 2340,
    category: "Electronics",
  },
  {
    id: 4,
    name: "Notebook Set",
    sales: 127,
    revenue: 2540,
    category: "Stationery",
  },
  {
    id: 5,
    name: "Wireless Mouse",
    sales: 64,
    revenue: 1920,
    category: "Electronics",
  },
];

export function TopProducts({ products = defaultProducts }: TopProductsProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Top Products</h3>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-blue-600">
                #{index + 1}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {product.name}
              </p>
              <p className="text-xs text-gray-500">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">
                ${product.revenue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">{product.sales} sales</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== SALES OVERVIEW WIDGET ==========
interface SalesChartProps {
  data?: { month: string; sales: number }[];
}

const defaultSalesData = [
  { month: "Jan", sales: 4200 },
  { month: "Feb", sales: 3800 },
  { month: "Mar", sales: 5100 },
  { month: "Apr", sales: 4600 },
  { month: "May", sales: 6200 },
  { month: "Jun", sales: 5800 },
];

export function SalesChart({ data = defaultSalesData }: SalesChartProps) {
  const maxSales = Math.max(...data.map((d) => d.sales));

  return (
    <div className="bg-white rounded-lg border-2 border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Sales Overview</h3>
      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = (item.sales / maxSales) * 100;
          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {item.month}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  ${item.sales.toLocaleString()}
                </span>
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

// ========== UPCOMING EVENTS WIDGET ==========
interface SalesCalendarProps {
  events?: SaleEvent[];
}

const defaultEvents: SaleEvent[] = [
  { id: 1, title: "Black Friday Sale", date: "Nov 24, 2025", type: "upcoming" },
  { id: 2, title: "Cyber Monday", date: "Nov 27, 2025", type: "upcoming" },
  {
    id: 3,
    title: "End of Year Clearance",
    date: "Dec 20, 2025",
    type: "upcoming",
  },
  { id: 4, title: "Holiday Special", date: "Dec 25, 2025", type: "upcoming" },
];

export function SalesCalendar({ events = defaultEvents }: SalesCalendarProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Upcoming Events</h3>
      </div>
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex flex-col items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-blue-600">
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                })}
              </span>
              <span className="text-lg font-bold text-blue-600">
                {new Date(event.date).getDate()}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {event.title}
              </p>
              <p className="text-xs text-gray-500">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== LOW STOCK ALERTS WIDGET ==========
interface LowStockAlertsProps {
  items?: LowStockItem[];
}

const defaultLowStockItems: LowStockItem[] = [
  {
    id: 1,
    name: "Office Chair",
    currentStock: 3,
    minStock: 10,
    category: "Furniture",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    currentStock: 5,
    minStock: 15,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Notebook Set",
    currentStock: 8,
    minStock: 20,
    category: "Stationery",
  },
  {
    id: 4,
    name: "Desk Lamp",
    currentStock: 2,
    minStock: 10,
    category: "Electronics",
  },
];

export function LowStockAlerts({ items = defaultLowStockItems }: LowStockAlertsProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-orange-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-orange-600" />
        <h3 className="text-lg font-bold text-gray-900">Low Stock Alerts</h3>
        <span className="ml-auto bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-full">
          {items.length}
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
          >
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-600">{item.category}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-orange-600">
                {item.currentStock} left
              </p>
              <p className="text-xs text-gray-500">Min: {item.minStock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
