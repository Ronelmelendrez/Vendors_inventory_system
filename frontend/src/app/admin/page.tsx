"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import {
  Header,
  StatsGrid,
  QuickActions,
  MobileQuickActions,
  WelcomeSection,
  MetricsGrid,
  ActivityFeed,
  TopProducts,
  SalesChart,
  LowStockAlerts,
  SalesCalendar,
} from "@/components/dashboard";
import { ProductsTable, AddProductModal } from "@/components/products";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/contexts/AuthContext";

function AdminDashboard() {
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
        {/* Welcome Message for Admin */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Welcome, Admin! 👋
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            You have full access to all products from all branches.
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
            {/* Metrics Overview */}
            <MetricsGrid
              totalProducts={products.length}
              totalSales={totalSales}
            />

            <StatsGrid
              totalProducts={products.length}
              totalSales={totalSales}
            />

            <ProductsTable products={products} />

            {/* Dashboard Widgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <ActivityFeed />
              <TopProducts />
              <SalesChart />
              <LowStockAlerts />
              <SalesCalendar />
            </div>

            <WelcomeSection />
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

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
