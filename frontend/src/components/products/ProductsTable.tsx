import { Product } from "@/types/product";
import { Edit, Trash2, Building2 } from "lucide-react";
import { useMemo } from "react";

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductsTable({
  products,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  // Group products by branch
  const productsByBranch = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    
    products.forEach((product) => {
      const branchName = product.branch_name || "Unknown Branch";
      if (!grouped[branchName]) {
        grouped[branchName] = [];
      }
      grouped[branchName].push(product);
    });
    
    return grouped;
  }, [products]);

  if (products.length === 0) return null;

  return (
    <div className="space-y-6 mb-6">
      {Object.entries(productsByBranch).map(([branchName, branchProducts]) => (
        <div
          key={branchName}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Branch Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{branchName}</h2>
                <p className="text-sm text-blue-100">
                  {branchProducts.length} {branchProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="p-6">
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {branchProducts.map((product) => (
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
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onEdit(product)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                            aria-label={`Edit ${product.name}`}
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(product)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                            aria-label={`Delete ${product.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
