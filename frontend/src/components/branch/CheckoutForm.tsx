interface CheckoutFormProps {
  customerName: string;
  cashReceived: string;
  total: number;
  onCustomerNameChange: (value: string) => void;
  onCashReceivedChange: (value: string) => void;
}

export function CheckoutForm({
  customerName,
  cashReceived,
  total,
  onCustomerNameChange,
  onCashReceivedChange,
}: CheckoutFormProps) {
  const cashAmount = parseFloat(cashReceived) || 0;
  const change = cashAmount - total;

  return (
    <div className="mt-4 border-t pt-4 space-y-3">
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">
          Customer Name *
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          className="w-full px-3 py-3 text-gray-900 font-medium bg-white border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600"
          placeholder="Enter customer name"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">
          Cash Received *
        </label>
        <input
          type="number"
          value={cashReceived}
          onChange={(e) => onCashReceivedChange(e.target.value)}
          step="0.01"
          min="0"
          className="w-full px-3 py-3 text-gray-900 font-medium bg-white border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600"
          placeholder="0.00"
        />
      </div>

      {cashReceived && cashAmount >= total && (
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-green-900">Change:</span>
            <span className="text-2xl font-bold text-green-600">
              ${change.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {cashReceived && cashAmount < total && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-3">
          <p className="text-sm font-bold text-red-900 text-center">
            Insufficient cash! Need ${(total - cashAmount).toFixed(2)} more
          </p>
        </div>
      )}
    </div>
  );
}
