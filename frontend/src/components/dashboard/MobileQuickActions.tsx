import { Package, ShoppingCart, RotateCcw, FileText } from "lucide-react";

interface MobileQuickActionsProps {
  onAddProduct: () => void;
  onRecordSale?: () => void;
}

export function MobileQuickActions({
  onAddProduct,
  onRecordSale,
}: MobileQuickActionsProps) {
  const actions = [
    {
      icon: Package,
      label: "Add Product",
      onClick: onAddProduct,
      color: "blue",
      available: true,
    },
    {
      icon: ShoppingCart,
      label: "Record Sale",
      onClick: onRecordSale || (() => {}),
      color: "green",
      available: true,
    },
    {
      icon: RotateCcw,
      label: "Return",
      onClick: () => {},
      color: "orange",
      available: false,
    },
    {
      icon: FileText,
      label: "Reports",
      onClick: () => {},
      color: "purple",
      available: false,
    },
  ];

  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 border-blue-100 dark:border-blue-900/50",
    green: "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 border-green-100 dark:border-green-900/50",
    orange: "bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 border-orange-100 dark:border-orange-900/50",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 border-purple-100 dark:border-purple-900/50",
  };

  return (
    <div className="lg:hidden mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              disabled={!action.available}
              className={`
                relative flex items-center justify-center gap-2 px-3 py-2.5 
                rounded-lg transition-all duration-200 border
                ${colorClasses[action.color as keyof typeof colorClasses]}
                ${!action.available ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
              `}
            >
              <action.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{action.label}</span>
              {!action.available && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-[10px] font-semibold rounded-full">
                  Soon
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            💡 <span className="font-medium">Tip:</span> Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono">Ctrl+N</kbd> for quick product add
          </p>
        </div>
      </div>
    </div>
  );
}
