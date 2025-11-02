# Dashboard Components

Enhanced dashboard components for the Vendor Management System.

## New Components

### MetricsGrid
Displays 6 key performance indicators with trend indicators:
- Total Products
- Total Sales
- Customers
- Revenue
- Growth Rate
- Low Stock Items

### QuickStat
Individual metric card with:
- Icon and color customization
- Trend indicators (up/down with percentage)
- Hover effects

### ActivityFeed
Shows recent activities:
- Sales transactions
- Stock updates
- User activities
- Timestamps and amounts

### TopProducts
Displays top-selling products with:
- Ranking badges
- Sales count
- Revenue
- Category tags

### SalesChart
Bar chart visualization showing:
- Monthly sales data
- Responsive bars
- Percentage-based scaling

### LowStockAlerts
Warning widget for inventory:
- Products below minimum stock
- Current vs minimum stock levels
- Alert count badge

### SalesCalendar
Upcoming events display:
- Event dates
- Calendar-style date badges
- Event titles

## Usage Example

```tsx
import {
  MetricsGrid,
  ActivityFeed,
  TopProducts,
  SalesChart,
  LowStockAlerts,
  SalesCalendar,
} from "@/components/dashboard";

export default function Dashboard() {
  return (
    <div>
      <MetricsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <TopProducts />
        <SalesChart />
        <LowStockAlerts />
        <SalesCalendar />
      </div>
    </div>
  );
}
```

## Features
- ✅ Responsive grid layouts
- ✅ Trend indicators
- ✅ Mock data for development
- ✅ TypeScript interfaces
- ✅ Customizable props
- ✅ Hover animations
- ✅ Color-coded alerts
