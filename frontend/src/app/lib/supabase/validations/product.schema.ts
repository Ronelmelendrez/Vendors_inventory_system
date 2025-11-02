import { z } from "zod";

export const productSchema = z.object({
  sku: z
    .string()
    .min(1, "SKU is required")
    .max(50, "SKU must be 50 characters or less")
    .regex(
      /^[A-Z0-9-]+$/,
      "SKU must contain only uppercase letters, numbers, and hyphens"
    ),

  item_name: z
    .string()
    .min(1, "Item name is required")
    .max(200, "Item name must be 200 characters or less"),

  category: z
    .string()
    .min(1, "Category is required")
    .max(100, "Category must be 100 characters or less"),

  default_unit_price: z
    .number()
    .min(0, "Price must be zero or positive")
    .max(999999.99, "Price is too large"),

  initial_stock_count: z
    .number()
    .int("Stock count must be a whole number")
    .min(0, "Stock count must be zero or positive")
    .max(999999, "Stock count is too large"),
});

export type ProductSchema = z.infer<typeof productSchema>;
