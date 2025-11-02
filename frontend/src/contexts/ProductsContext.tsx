"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product, ProductFormData } from "@/types/product";

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  removeProduct: (id: string) => void;
  totalSales: number;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

const initialFormData: ProductFormData = {
  name: "",
  price: "",
  size: "",
  type: "",
  category: "",
};

// Initial products available in the system
const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Laptop Dell XPS 13",
    price: 1299.99,
    size: "13-inch",
    type: "Laptop",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Wireless Mouse Logitech",
    price: 29.99,
    size: "Standard",
    type: "Accessory",
    category: "Electronics",
  },
  {
    id: "3",
    name: "Office Chair Ergonomic",
    price: 199.99,
    size: "Large",
    type: "Furniture",
    category: "Furniture",
  },
  {
    id: "4",
    name: "LED Desk Lamp",
    price: 39.99,
    size: "Medium",
    type: "Lighting",
    category: "Furniture",
  },
  {
    id: "5",
    name: "Notebook Pack (5-pack)",
    price: 12.99,
    size: "A4",
    type: "Notebook",
    category: "Stationery",
  },
  {
    id: "6",
    name: "Pen Set Premium",
    price: 8.99,
    size: "Standard",
    type: "Writing",
    category: "Stationery",
  },
  {
    id: "7",
    name: "USB-C Hub 7-in-1",
    price: 45.99,
    size: "Compact",
    type: "Accessory",
    category: "Electronics",
  },
  {
    id: "8",
    name: "Monitor Stand Adjustable",
    price: 59.99,
    size: "Universal",
    type: "Furniture",
    category: "Furniture",
  },
];

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const totalSales = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, removeProduct, totalSales }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error(
      "useProductsContext must be used within a ProductsProvider"
    );
  }
  return context;
}
