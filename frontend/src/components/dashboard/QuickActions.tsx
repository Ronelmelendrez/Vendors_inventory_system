"use client";

import {
  Package,
  ShoppingCart,
  RotateCcw,
  FileText,
  ChevronRight,
  Sparkles,
} from "lucide-react";

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

function ActionItem({
  icon,
  text,
  onClick,
  color = "blue",
  badge,
}: ActionItemProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200",
    green: "bg-green-50 text-green-600 hover:bg-green-100 border-green-200",
    orange:
      "bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200",
    purple:
      "bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200",
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
          <span className="px-2 py-0.5 bg-white rounded-full text-xs font-bold shadow-sm">
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
    <aside className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-fit sticky top-8">
      {/* Side Header */}
      <div className="bg-linear-to-br from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Quick Access</h2>
            <p className="text-xs text-blue-100">Inventory Management</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <Sparkles className="h-4 w-4 text-yellow-300" />
          <span className="text-xs font-medium">
            Everything at your fingertips
          </span>
        </div>
      </div>

      {/* Actions Section */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Quick Actions
          </h3>
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
        <div className="mt-6 p-4 bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <p className="text-xs font-semibold text-blue-900 mb-1">💡 Pro Tip</p>
          <p className="text-xs text-blue-700">
            Use keyboard shortcuts to speed up your workflow
          </p>
        </div>
      </div>
    </aside>
  );
}
