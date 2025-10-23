import { z } from "zod";

export const transactionSchema = z.object({
  sku: z.string().min(1, "Please select a product"),

  date_time: z.string().min(1, "Date and time are required"),

  transaction_type: z.enum(["Sale", "Return", "Inventory Count"], {
    message: "Please select a transaction type",
  }),

  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(10000, "Quantity is too large"),

  actual_unit_price: z
    .number()
    .min(0, "Price must be zero or positive")
    .max(999999.99, "Price is too large"),

  payment_method: z.string().optional(),

  vendor_location: z.string().optional(),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
