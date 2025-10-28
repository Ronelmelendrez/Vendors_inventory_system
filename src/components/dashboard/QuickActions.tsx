import { ActionButton } from "@/components/ui/ActionButton";

interface QuickActionsProps {
  onAddProduct: () => void;
}

export function QuickActions({ onAddProduct }: QuickActionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ActionButton text="Add Product" onClick={onAddProduct} />
        <ActionButton text="Record Sale" onClick={() => {}} />
        <ActionButton text="Record Return" onClick={() => {}} />
        <ActionButton text="View Reports" onClick={() => {}} />
      </div>
    </div>
  );
}
