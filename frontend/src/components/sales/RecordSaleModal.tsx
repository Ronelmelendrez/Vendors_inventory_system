import { X } from "lucide-react";
import { Product } from "@/types/product";

interface RecordSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSubmit: (e: React.FormEvent) => void;
  formData: {
    productId: string;
    quantity: string;
    customerName: string;
    paymentMethod: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export function RecordSaleModal({
  isOpen,
  onClose,
  products,
  onSubmit,
  formData,
  onInputChange,
}: RecordSaleModalProps) {
  if (!isOpen) return null;

  const selectedProduct = products.find((p) => p.id === formData.productId);
  const total = selectedProduct
    ? selectedProduct.price * parseFloat(formData.quantity || "0")
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Record Sale</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="productId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Product *
            </label>
            <select
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={onInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a product...</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - ${product.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantity *
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={onInputChange}
              required
              min="1"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Customer Name *
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={onInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Payment Method *
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={onInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose payment method...</option>
              <option value="cash">Cash</option>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="mobile">Mobile Payment</option>
            </select>
          </div>

          {selectedProduct && formData.quantity && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Total Amount:
                </span>
                <span className="text-lg font-bold text-blue-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Record Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
