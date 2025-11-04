export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  customerName: string;
  paymentMethod: "cash" | "credit" | "debit" | "mobile";
  saleDate: Date;
}

export interface SaleFormData {
  productId: string;
  quantity: string;
  customerName: string;
  paymentMethod: string;
}
