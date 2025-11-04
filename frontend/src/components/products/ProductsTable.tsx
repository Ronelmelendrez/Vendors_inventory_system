import { Product } from "@/types/product";
import { Edit } from "lucide-react";

interface ProductsTableProps {
  products: Product[];
  onEdit?: (product: Product) => void;
}

export function ProductsTable({ products, onEdit }: ProductsTableProps) {
  if (products.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Added Products
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Size
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              {onEdit && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {product.size}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {product.type}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {product.category}
                </td>
                {onEdit && (
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => onEdit(product)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                      aria-label={`Edit ${product.name}`}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
