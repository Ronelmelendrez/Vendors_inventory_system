import { AlertTriangle } from "lucide-react";

interface LowStockItem {
  id: number;
  name: string;
  currentStock: number;
  minStock: number;
  category: string;
}

interface LowStockAlertsProps {
  items?: LowStockItem[];
}

const defaultItems: LowStockItem[] = [
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

export function LowStockAlerts({ items = defaultItems }: LowStockAlertsProps) {
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
