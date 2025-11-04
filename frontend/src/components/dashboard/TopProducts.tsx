interface TopProduct {
  id: number;
  name: string;
  sales: number;
  revenue: number;
  category: string;
}

interface TopProductsProps {
  products?: TopProduct[];
}

const defaultProducts: TopProduct[] = [
  {
    id: 1,
    name: "Laptop Pro",
    sales: 45,
    revenue: 58455,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Office Chair",
    sales: 38,
    revenue: 11400,
    category: "Furniture",
  },
  {
    id: 3,
    name: "Desk Lamp",
    sales: 52,
    revenue: 2340,
    category: "Electronics",
  },
  {
    id: 4,
    name: "Notebook Set",
    sales: 127,
    revenue: 2540,
    category: "Stationery",
  },
  {
    id: 5,
    name: "Wireless Mouse",
    sales: 64,
    revenue: 1920,
    category: "Electronics",
  },
];

export function TopProducts({ products = defaultProducts }: TopProductsProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Top Products</h3>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-blue-600">
                #{index + 1}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {product.name}
              </p>
              <p className="text-xs text-gray-500">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">
                ${product.revenue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">{product.sales} sales</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
