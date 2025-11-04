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
import { RecordSaleModal } from "@/components/sales";
import { useProducts } from "@/hooks/useProducts";
import { useSales } from "@/hooks/useSales";
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
    handleEditProduct,
    handleDeleteProduct,
  } = useProducts();

  const {
    sales,
    isSaleModalOpen,
    saleFormData,
    totalSalesRevenue,
    setIsSaleModalOpen,
    handleSaleInputChange,
    handleRecordSale,
  } = useSales();

  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message for Admin */}
        <div className="mb-6 bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg border p-6">
          <h2 className="text-xl font-bold text-white">Welcome, Admin! 👋</h2>
          <p className="text-sm text-blue-100 mt-1">
            You have full access to all products from all branches.
          </p>
        </div>

        {/* Mobile Quick Actions */}
        <MobileQuickActions 
          onAddProduct={() => setIsModalOpen(true)}
          onRecordSale={() => setIsSaleModalOpen(true)}
        />

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 shrink-0 hidden lg:block">
            <QuickActions 
              onAddProduct={() => setIsModalOpen(true)}
              onRecordSale={() => setIsSaleModalOpen(true)}
            />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Metrics Overview */}
            <MetricsGrid
              totalProducts={products.length}
              totalSales={totalSales}
            />

            {/* Stats Cards */}
            <StatsGrid
              totalProducts={products.length}
              totalSales={totalSales}
            />

            {/* Products Table */}
            <div className="mb-6">
              <ProductsTable
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            </div>

            {/* Dashboard Widgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <ActivityFeed />
              </div>
              <div>
                <TopProducts />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <SalesChart />
              <LowStockAlerts />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <SalesCalendar />
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

      <RecordSaleModal
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
        products={products}
        formData={saleFormData}
        onInputChange={handleSaleInputChange}
        onSubmit={(e) => handleRecordSale(e, products)}
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
