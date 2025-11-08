import { useState } from "react";
import { Sale, SaleFormData } from "@/types/sale";
import { Product } from "@/types/product";

const initialSaleFormData: SaleFormData = {
  productId: "",
  quantity: "",
  customerName: "",
  paymentMethod: "",
};

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [saleFormData, setSaleFormData] =
    useState<SaleFormData>(initialSaleFormData);

  const handleSaleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSaleFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecordSale = (e: React.FormEvent, products: Product[]) => {
    e.preventDefault();

    const selectedProduct = products.find(
      (p) => p.id === saleFormData.productId
    );

    if (!selectedProduct) {
      alert("Please select a valid product");
      return;
    }

    const quantity = parseFloat(saleFormData.quantity);
    const totalAmount = selectedProduct.price * quantity;

    const newSale: Sale = {
      id: Date.now().toString(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity,
      unitPrice: selectedProduct.price,
      totalAmount,
      customerName: saleFormData.customerName,
      paymentMethod: saleFormData.paymentMethod as Sale["paymentMethod"],
      saleDate: new Date(),
    };

    setSales((prev) => [newSale, ...prev]);
    setSaleFormData(initialSaleFormData);
    setIsSaleModalOpen(false);

    alert(
      `Sale recorded successfully!\nProduct: ${
        selectedProduct.name
      }\nQuantity: ${quantity}\nTotal: $${totalAmount.toFixed(2)}`
    );
  };

  const totalSalesRevenue = sales.reduce(
    (sum, sale) => sum + sale.totalAmount,
    0
  );

  return {
    sales,
    isSaleModalOpen,
    saleFormData,
    totalSalesRevenue,
    setIsSaleModalOpen,
    handleSaleInputChange,
    handleRecordSale,
  };
}
