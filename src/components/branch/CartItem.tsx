import { Plus, Minus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onUpdateQuantity: (id: string, change: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({
  id,
  name,
  price,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="border-b pb-3 last:border-b-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="font-bold text-sm text-gray-900">{name}</h4>
          <p className="text-xs text-gray-500">${price.toFixed(2)} each</p>
        </div>
        <button
          onClick={() => onRemove(id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(id, -1)}
          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="px-3 py-1 bg-gray-100 rounded font-bold">
          {quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(id, 1)}
          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <Plus className="h-4 w-4" />
        </button>
        <span className="ml-auto font-bold text-gray-900">
          ${(price * quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
