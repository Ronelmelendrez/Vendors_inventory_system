"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import {
  Header,
  StatsGrid,
  QuickActions,
  MobileQuickActions,
} from "@/components/dashboard";
import { ProductsTable, AddProductModal } from "@/components/products";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/contexts/AuthContext";

function BranchDashboard() {
  const {
    products,
    isModalOpen,
    formData,
    totalSales,
    setIsModalOpen,
    handleInputChange,
    handleAddProduct,
  } = useProducts();

  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message for Branch */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Welcome, {user?.branch_name || "Branch User"}! 👋
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Record customer purchases and manage your branch inventory.
          </p>
        </div>

        {/* Mobile Quick Actions */}
        <MobileQuickActions onAddProduct={() => setIsModalOpen(true)} />

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 shrink-0 hidden lg:block">
            <QuickActions onAddProduct={() => setIsModalOpen(true)} />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <StatsGrid
              totalProducts={products.length}
              totalSales={totalSales}
            />

            <ProductsTable products={products} />

            {/* Branch specific message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Record Customer Purchases
              </h3>
              <p className="text-blue-700 mb-4">
                Use "Add Product" to record items purchased by customers. All
                sales data will be visible to the admin dashboard.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Record New Purchase
              </button>
            </div>
          </main>
        </div>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleAddProduct}
      />
    </div>
  );
}

export default function BranchPage() {
  return (
    <ProtectedRoute allowedRoles={["branch"]}>
      <BranchDashboard />
    </ProtectedRoute>
  );
}
