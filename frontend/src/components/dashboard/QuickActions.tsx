"use client";

import {
  Package,
  ShoppingCart,
  RotateCcw,
  FileText,
  ChevronRight,
  Sparkles,
  Building2,
  X,
  Warehouse,
} from "lucide-react";
import { useState } from "react";

interface QuickActionsProps {
  onAddProduct: () => void;
  onRecordSale?: () => void;
  onBranchSelect?: (branchName: string) => void;
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
  onBranchSelect,
}: QuickActionsProps) {
  const [showBranchSelection, setShowBranchSelection] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  const branches = [
    { id: 1, name: "Main Branch", location: "Downtown" },
    { id: 2, name: "North Branch", location: "North District" },
    { id: 3, name: "South Branch", location: "South District" },
    { id: 4, name: "East Branch", location: "East District" },
  ];

  const handleBranchSelect = (branchId: number, branchName: string) => {
    console.log(`Selected branch: ${branchName} (ID: ${branchId})`);
    setShowBranchSelection(false);
    if (onBranchSelect) {
      onBranchSelect(branchName);
    }
    onAddProduct();
  };

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
            onClick={() => setShowBranchSelection(true)}
            color="blue"
          />
          <ActionItem
            icon={<ShoppingCart className="h-5 w-5" />}
            text="Record Sale"
            onClick={onRecordSale || (() => {})}
            color="green"
          />
          <ActionItem
            icon={<Warehouse className="h-5 w-5" />}
            text="Inventory"
            onClick={() => setShowInventory(true)}
            color="orange"
          />
          <ActionItem
            icon={<FileText className="h-5 w-5" />}
            text="View Reports"
            onClick={() => {}}
            color="purple"
            badge="Soon"
          />
        </nav>

        {/* Branch Selection Modal */}
        {showBranchSelection && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Select Branch
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Choose which branch to add the product to
                  </p>
                </div>
                <button
                  onClick={() => setShowBranchSelection(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Branch List */}
              <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => handleBranchSelect(branch.id, branch.name)}
                    className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900">
                        {branch.name}
                      </p>
                      <p className="text-xs text-gray-500">{branch.location}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
                <button
                  onClick={() => setShowBranchSelection(false)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Modal */}
        {showInventory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-linear-to-r from-orange-600 to-red-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Warehouse className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Inventory by Branch
                    </h3>
                    <p className="text-sm text-orange-100">View stock levels across all branches</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInventory(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-6">
                  {branches.map((branch) => (
                    <div key={branch.id} className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                      {/* Branch Header */}
                      <div className="bg-linear-to-r from-orange-500 to-red-500 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-white">{branch.name}</h4>
                            <p className="text-xs text-orange-100">{branch.location}</p>
                          </div>
                        </div>
                      </div>

                      {/* Inventory Table */}
                      <div className="p-4">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {/* Sample data - replace with actual product data */}
                              <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">Sample Product</td>
                                <td className="px-4 py-3 text-sm text-gray-600">Electronics</td>
                                <td className="px-4 py-3 text-sm font-semibold text-gray-900">25 units</td>
                                <td className="px-4 py-3 text-sm text-gray-900">$99.99</td>
                                <td className="px-4 py-3">
                                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                    In Stock
                                  </span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">Low Stock Item</td>
                                <td className="px-4 py-3 text-sm text-gray-600">Furniture</td>
                                <td className="px-4 py-3 text-sm font-semibold text-orange-600">5 units</td>
                                <td className="px-4 py-3 text-sm text-gray-900">$149.99</td>
                                <td className="px-4 py-3">
                                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                                    Low Stock
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        {/* Branch Summary */}
                        <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Total Products</p>
                              <p className="text-sm font-bold text-gray-900">2</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Total Stock</p>
                              <p className="text-sm font-bold text-gray-900">30 units</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Total Value</p>
                              <p className="text-sm font-bold text-green-600">$3,249.75</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">{branches.length}</span> branches total
                </div>
                <button
                  onClick={() => setShowInventory(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

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
