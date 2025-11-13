import { useState } from "react";
import { Product, ProductFormData } from "@/types/product";

const initialFormData: ProductFormData = {
  name: "",
  price: "",
  size: "",
  type: "",
  category: "",
  branch_name: "",
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

  const setBranchName = (branchName: string) => {
    setFormData((prev) => ({ ...prev, branch_name: branchName }));
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
      branch_name: formData.branch_name,
    };
    setProducts((prev) => [...prev, newProduct]);
    setFormData(initialFormData);
    setIsModalOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    // TODO: Implement edit functionality
    console.log("Edit product:", product);
    alert(`Edit functionality for "${product.name}" will be implemented soon!`);
  };

  const handleDeleteProduct = (product: Product) => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
  };

  const totalSales = products.reduce((sum, product) => sum + product.price, 0);

  return {
    products,
    isModalOpen,
    formData,
    totalSales,
    setIsModalOpen,
    handleInputChange,
    setBranchName,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
  };
}
