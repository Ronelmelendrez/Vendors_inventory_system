import { Plus, Building2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { ProductFormData, PRODUCT_CATEGORIES } from "@/types/product";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ProductFormData;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddProductModal({
  isOpen,
  onClose,
  formData,
  onInputChange,
  onSubmit,
}: AddProductModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
      <form onSubmit={onSubmit} className="space-y-4">
        {formData.branch_name && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-900">
                  Adding to Branch
                </p>
                <p className="text-sm font-bold text-blue-700">
                  {formData.branch_name}
                </p>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            required
            className="w-full px-3 py-3 text-gray-900 font-medium bg-white border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1">
            Price *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={onInputChange}
            required
            step="0.01"
            min="0"
            className="w-full px-3 py-3 text-gray-900 font-medium bg-white border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1">
            Size *
          </label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={onInputChange}
            required
            className="w-full px-3 py-3 text-gray-900 font-medium bg-white border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600"
            placeholder="e.g., Small, Medium, Large"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1">
            Type *
          </label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={onInputChange}
            required
            className="w-full px-3 py-3 text-gray-900 font-medium bg-white border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600"
            placeholder="Enter product type"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={onInputChange}
            required
            className="w-full px-3 py-3 text-gray-900 font-medium bg-white border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select category</option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Product
          </button>
        </div>
      </form>
    </Modal>
  );
}
