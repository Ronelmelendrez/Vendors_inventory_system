"use client";

import {
  Header,
  StatsGrid,
  QuickActions,
  WelcomeSection,
} from "@/components/dashboard";
import { ProductsTable, AddProductModal } from "@/components/products";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const {
    products,
    isModalOpen,
    formData,
    totalSales,
    setIsModalOpen,
    handleInputChange,
    handleAddProduct,
  } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsGrid totalProducts={products.length} totalSales={totalSales} />

        <QuickActions onAddProduct={() => setIsModalOpen(true)} />

        <ProductsTable products={products} />

        <WelcomeSection />
      </main>

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
