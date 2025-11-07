import { Bell, Shield, Trash2, Palette } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme";

export function AccountSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    salesAlerts: true,
    lowStockAlerts: true,
    weeklyReports: false,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    // Save to localStorage
    const updatedNotifications = {
      ...notifications,
      [key]: !notifications[key],
    };
    localStorage.setItem(
      "notificationSettings",
      JSON.stringify(updatedNotifications)
    );
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      const doubleConfirm = window.confirm(
        "This will permanently delete all your data. Are you absolutely sure?"
      );
      if (doubleConfirm) {
        alert("Account deletion feature will be implemented soon.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border mt-6">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          Account Settings
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage your account preferences and notifications
        </p>
      </div>

      <div className="p-6">
        {/* Appearance Section */}
        <div className="mb-8">
          <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
            <Palette className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Appearance
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Theme
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Switch between light and dark mode
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mb-8">
          <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
            <Bell className="h-5 w-5 text-blue-600" />
            Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Email Notifications
                </p>
                <p className="text-xs text-gray-500">
                  Receive email updates about your account
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.emailNotifications}
                  onChange={() =>
                    handleNotificationChange("emailNotifications")
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Sales Alerts
                </p>
                <p className="text-xs text-gray-500">
                  Get notified when new sales are recorded
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.salesAlerts}
                  onChange={() => handleNotificationChange("salesAlerts")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Low Stock Alerts
                </p>
                <p className="text-xs text-gray-500">
                  Alert when inventory is running low
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.lowStockAlerts}
                  onChange={() => handleNotificationChange("lowStockAlerts")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Weekly Reports
                </p>
                <p className="text-xs text-gray-500">
                  Receive weekly summary reports
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.weeklyReports}
                  onChange={() => handleNotificationChange("weeklyReports")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="mb-8">
          <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
            <Shield className="h-5 w-5 text-blue-600" />
            Privacy & Security
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                Your data is encrypted and stored securely. We never share your
                information with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-6 border-t">
          <h3 className="flex items-center gap-2 text-base font-semibold text-red-600 mb-4">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </h3>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-gray-700 mb-3">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
