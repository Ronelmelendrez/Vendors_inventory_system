import { useMemo } from "react";
import { Product } from "@/types/product";

export function useProductFilter(
  products: Product[],
  searchTerm: string,
  selectedCategory: string
) {
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).filter(Boolean),
    [products]
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [products, searchTerm, selectedCategory]
  );

  return {
    categories,
    filteredProducts,
  };
}
