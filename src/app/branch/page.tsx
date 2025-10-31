"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/dashboard";
import { useAuth } from "@/contexts/AuthContext";
import { useProductsContext } from "@/contexts/ProductsContext";
import { ShoppingCart, DollarSign } from "lucide-react";
import {
  ProductGrid,
  SearchFilter,
  CartItem,
  CheckoutForm,
  OrderSummary,
} from "@/components/branch";
import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/useCheckout";
import { useProductFilter } from "@/hooks/useProductFilter";

function BranchDashboard() {
  const { user } = useAuth();
  const { products } = useProductsContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Custom hooks
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    tax,
    total,
  } = useCart();

  const {
    customerName,
    setCustomerName,
    cashReceived,
    setCashReceived,
    validateCheckout,
    calculateChange,
    resetForm,
  } = useCheckout();

  const { categories, filteredProducts } = useProductFilter(
    products,
    searchTerm,
    selectedCategory
  );

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const error = validateCheckout(total);
    if (error) {
      alert(error);
      return;
    }

    const change = calculateChange(total);
    alert(
      `Purchase Completed!\n\nCustomer: ${customerName}\nTotal: $${total.toFixed(
        2
      )}\nCash: $${parseFloat(cashReceived).toFixed(
        2
      )}\nChange: $${change.toFixed(2)}\nItems: ${cart.length}`
    );

    clearCart();
    resetForm();
  };

  const handleClearCart = () => {
    clearCart();
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-bold text-gray-900">
            Cashier - {user?.branch_name || "Branch"} 🏪
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Select products to record customer purchases
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Selection - Left Side */}
          <div className="lg:col-span-2 space-y-4">
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              categories={categories}
              onCategoryChange={setSelectedCategory}
            />

            <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
          </div>

          {/* Shopping Cart - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                Current Sale
              </h3>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>

                  <OrderSummary subtotal={subtotal} tax={tax} total={total} />

                  <CheckoutForm
                    customerName={customerName}
                    cashReceived={cashReceived}
                    total={total}
                    onCustomerNameChange={setCustomerName}
                    onCashReceivedChange={setCashReceived}
                  />

                  <div className="mt-4 space-y-2">
                    <button
                      onClick={handleCheckout}
                      className="w-full px-4 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <DollarSign className="h-5 w-5" />
                      Complete Purchase
                    </button>
                    <button
                      onClick={handleClearCart}
                      className="w-full px-4 py-2 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
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
