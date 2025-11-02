import { useState } from "react";

export function useCheckout() {
  const [customerName, setCustomerName] = useState("");
  const [cashReceived, setCashReceived] = useState("");

  const cashAmount = parseFloat(cashReceived) || 0;

  const validateCheckout = (total: number): string | null => {
    if (!customerName.trim()) {
      return "Please enter customer name";
    }
    if (cashAmount < total) {
      return "Cash received is less than total amount!";
    }
    return null;
  };

  const calculateChange = (total: number): number => {
    return cashAmount - total;
  };

  const resetForm = () => {
    setCustomerName("");
    setCashReceived("");
  };

  return {
    customerName,
    setCustomerName,
    cashReceived,
    setCashReceived,
    cashAmount,
    validateCheckout,
    calculateChange,
    resetForm,
  };
}
