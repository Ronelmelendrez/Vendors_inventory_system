"use client";

import { Package, ShoppingCart, RotateCcw, FileText, ChevronRight } from "lucide-react";

interface QuickActionsProps {
  onAddProduct: () => void;
  onRecordSale?: () => void;
}

interface ActionItemProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  color?: string;
  badge?: string;
}

function ActionItem({ icon, text, onClick, color = "blue", badge }: ActionItemProps) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 border-green-200 dark:border-green-800",
    orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 border-orange-200 dark:border-orange-800",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 border-purple-200 dark:border-purple-800",
  };

  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 border ${
        colorClasses[color as keyof typeof colorClasses] || colorClasses.blue
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="shrink-0 transition-transform group-hover:scale-110 duration-200">
          {icon}
        </div>
        <span className="font-semibold text-sm">{text}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="px-2 py-0.5 bg-white dark:bg-gray-800 rounded-full text-xs font-bold shadow-sm">
            {badge}
          </span>
        )}
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 duration-200" />
      </div>
    </button>
  );
}

export function QuickActions({
  onAddProduct,
  onRecordSale,
}: QuickActionsProps) {
  return (
    <aside className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 h-fit sticky top-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
          Quick Actions
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Manage your inventory efficiently
        </p>
      </div>
      
      <nav className="space-y-3">
        <ActionItem
          icon={<Package className="h-5 w-5" />}
          text="Add Product"
          onClick={onAddProduct}
          color="blue"
        />
        <ActionItem
          icon={<ShoppingCart className="h-5 w-5" />}
          text="Record Sale"
          onClick={onRecordSale || (() => {})}
          color="green"
        />
        <ActionItem
          icon={<RotateCcw className="h-5 w-5" />}
          text="Record Return"
          onClick={() => {}}
          color="orange"
          badge="Soon"
        />
        <ActionItem
          icon={<FileText className="h-5 w-5" />}
          text="View Reports"
          onClick={() => {}}
          color="purple"
          badge="Soon"
        />
      </nav>

      {/* Tip Section */}
      <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">
          💡 Pro Tip
        </p>
        <p className="text-xs text-blue-700 dark:text-blue-300">
          Use keyboard shortcuts to speed up your workflow
        </p>
      </div>
    </aside>
  );
}
