"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/dashboard";
import { useAuth } from "@/contexts/AuthContext";
import { ShoppingCart, Plus, Minus, Trash2, DollarSign } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/types/product";

// Mock available products (in real app, these would come from admin)
const AVAILABLE_PRODUCTS = [
  { id: "1", name: "Laptop Dell XPS", price: 1299.99, category: "Electronics" },
  { id: "2", name: "Wireless Mouse", price: 29.99, category: "Electronics" },
  { id: "3", name: "Office Chair", price: 199.99, category: "Furniture" },
  { id: "4", name: "Desk Lamp", price: 39.99, category: "Furniture" },
  { id: "5", name: "Notebook Pack", price: 12.99, category: "Stationery" },
  { id: "6", name: "Pen Set", price: 8.99, category: "Stationery" },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

function BranchDashboard() {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts = AVAILABLE_PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: typeof AVAILABLE_PRODUCTS[0]) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(
      `Purchase recorded!\nTotal: $${total.toFixed(2)}\nItems: ${cart.length}`
    );
    clearCart();
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
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 text-gray-900 font-medium bg-white border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600"
                />
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  {["Electronics", "Furniture", "Stationery"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === cat
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {product.category}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-3 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>

          {/* Shopping Cart - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                Current Sale
              </h3>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Cart is empty
                </p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="border-b pb-3 last:border-b-0"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-gray-900">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1 bg-gray-100 rounded font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <span className="ml-auto font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (10%):</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span className="text-blue-600">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <button
                      onClick={handleCheckout}
                      className="w-full px-4 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <DollarSign className="h-5 w-5" />
                      Complete Purchase
                    </button>
                    <button
                      onClick={clearCart}
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
