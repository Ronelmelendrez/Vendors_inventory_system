export interface Product {
  id: string;
  name: string;
  price: number;
  size: string;
  type: string;
  category: string;
}

export interface ProductFormData {
  name: string;
  price: string;
  size: string;
  type: string;
  category: string;
}

export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Food",
  "Furniture",
  "Books",
  "Other",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
