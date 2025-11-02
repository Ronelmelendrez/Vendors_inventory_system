interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
}

export function OrderSummary({ subtotal, tax, total }: OrderSummaryProps) {
  return (
    <div className="border-t pt-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal:</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Tax (10%):</span>
        <span className="font-medium">${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-lg font-bold border-t pt-2">
        <span>Total:</span>
        <span className="text-blue-600">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
