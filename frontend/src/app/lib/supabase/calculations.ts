import { ItemRecordingLog, CurrentInventory } from "@/types/database";

/**
 * Calculate current stock level for a product
 */
export function calculateCurrentStock(
  initialStock: number,
  transactions: ItemRecordingLog[]
): number {
  const stockChange = transactions.reduce((total, transaction) => {
    switch (transaction.transaction_type) {
      case "Sale":
        return total - transaction.quantity;
      case "Return":
        return total + transaction.quantity;
      case "Inventory Count":
        return total + transaction.quantity;
      default:
        return total;
    }
  }, 0);

  return initialStock + stockChange;
}

/**
 * Calculate total inventory value
 */
export function calculateInventoryValue(inventory: CurrentInventory[]): number {
  return inventory.reduce((total, item) => {
    return total + item.current_inventory_value;
  }, 0);
}

/**
 * Get top N items by revenue
 */
export function getTopItems<T extends { total_revenue: number }>(
  items: T[],
  count: number = 10
): T[] {
  return [...items]
    .sort((a, b) => b.total_revenue - a.total_revenue)
    .slice(0, count);
}

/**
 * Group transactions by date
 */
export function groupByDate(
  transactions: Array<{ date_time: string; total_sale_amount: number }>
): Record<string, number> {
  return transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date_time).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + transaction.total_sale_amount;
    return acc;
  }, {} as Record<string, number>);
}
