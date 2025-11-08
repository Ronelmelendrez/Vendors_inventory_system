import { Package, ShoppingCart, RotateCcw, FileText } from "lucide-react";

interface MobileQuickActionsProps {
  onAddProduct: () => void;
  onRecordSale?: () => void;
}

export function MobileQuickActions({
  onAddProduct,
  onRecordSale,
}: MobileQuickActionsProps) {
  return (
    <div className="lg:hidden mb-6">
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onAddProduct}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Package className="h-4 w-4" />
            <span className="text-sm font-medium">Add Product</span>
          </button>
          <button
            onClick={onRecordSale || (() => {})}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm font-medium">Record Sale</span>
          </button>
          <button
            onClick={() => {}}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm font-medium">Return</span>
          </button>
          <button
            onClick={() => {}}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}
