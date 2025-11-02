import { useState } from "react";
import { Product, ProductFormData } from "@/types/product";

const initialFormData: ProductFormData = {
  name: "",
  price: "",
  size: "",
  type: "",
  category: "",
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      size: formData.size,
      type: formData.type,
      category: formData.category,
    };
    setProducts((prev) => [...prev, newProduct]);
    setFormData(initialFormData);
    setIsModalOpen(false);
  };

  const totalSales = products.reduce((sum, product) => sum + product.price, 0);

  return {
    products,
    isModalOpen,
    formData,
    totalSales,
    setIsModalOpen,
    handleInputChange,
    handleAddProduct,
  };
}
