import { TrendingUp, TrendingDown } from "lucide-react";

interface RecentActivity {
  id: number;
  type: "sale" | "stock" | "user";
  message: string;
  timestamp: string;
  amount?: number;
}

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

export function ActivityFeed({ activities = defaultActivities }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              activity.type === 'sale' ? 'bg-green-100' :
              activity.type === 'stock' ? 'bg-orange-100' :
              'bg-blue-100'
            }`}>
              {activity.type === 'sale' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : activity.type === 'stock' ? (
                <TrendingDown className="h-4 w-4 text-orange-600" />
              ) : (
                <span className="text-blue-600 text-xs font-bold">U</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
                {activity.amount && (
                  <p className="text-sm font-semibold text-green-600">${activity.amount}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
