import { Package, ShoppingCart, RotateCcw, FileText } from "lucide-react";

interface QuickActionsProps {
  onAddProduct: () => void;
  onRecordSale?: () => void;
}

interface ActionItemProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

function ActionItem({ icon, text, onClick }: ActionItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
    >
      <div className="shrink-0 text-gray-500 group-hover:text-blue-600 transition-colors">
        {icon}
      </div>
      <span className="font-medium">{text}</span>
    </button>
  );
}

export function QuickActions({
  onAddProduct,
  onRecordSale,
}: QuickActionsProps) {
  return (
    <aside className="bg-white rounded-lg shadow-sm border p-6 h-fit sticky top-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h2>
      <nav className="space-y-2">
        <ActionItem
          icon={<Package className="h-5 w-5" />}
          text="Add Product"
          onClick={onAddProduct}
        />
        <ActionItem
          icon={<ShoppingCart className="h-5 w-5" />}
          text="Record Sale"
          onClick={onRecordSale || (() => {})}
        />
        <ActionItem
          icon={<RotateCcw className="h-5 w-5" />}
          text="Record Return"
          onClick={() => {}}
        />
        <ActionItem
          icon={<FileText className="h-5 w-5" />}
          text="View Reports"
          onClick={() => {}}
        />
      </nav>
    </aside>
  );
}
