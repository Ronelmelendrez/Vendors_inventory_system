"use client";

import { Clock, Package, ShoppingCart, Settings, FileText } from "lucide-react";

interface Activity {
  id: string;
  type: "product" | "sale" | "settings" | "report";
  description: string;
  timestamp: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function ProfileActivity() {
  const recentActivities: Activity[] = [
    {
      id: "1",
      type: "settings",
      description: "Updated profile settings",
      timestamp: "2 hours ago",
      icon: Settings,
    },
    {
      id: "2",
      type: "product",
      description: "Added new product",
      timestamp: "5 hours ago",
      icon: Package,
    },
    {
      id: "3",
      type: "sale",
      description: "Recorded a sale",
      timestamp: "1 day ago",
      icon: ShoppingCart,
    },
    {
      id: "4",
      type: "report",
      description: "Generated monthly report",
      timestamp: "2 days ago",
      icon: FileText,
    },
  ];

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "product":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
      case "sale":
        return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
      case "settings":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
      case "report":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div
              className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}
            >
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {activity.description}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3" />
                <span>{activity.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
