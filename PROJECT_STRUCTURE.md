# Vendor Management System - Project Structure

## 📁 Folder Structure

```
src/
├── app/
│   ├── page.tsx                    # Main dashboard page (refactored & clean)
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
│
├── components/
│   ├── dashboard/                  # Dashboard-specific components
│   │   ├── Header.tsx             # App header with logo
│   │   ├── StatsGrid.tsx          # Statistics cards grid
│   │   ├── QuickActions.tsx       # Quick action buttons
│   │   ├── WelcomeSection.tsx     # Welcome message component
│   │   └── index.ts               # Barrel export
│   │
│   ├── products/                   # Product-related components
│   │   ├── ProductsTable.tsx      # Products display table
│   │   ├── AddProductModal.tsx    # Add product modal form
│   │   └── index.ts               # Barrel export
│   │
│   └── ui/                         # Reusable UI components
│       ├── StatCard.tsx           # Statistics card component
│       ├── ActionButton.tsx       # Action button component
│       ├── Modal.tsx              # Generic modal component
│       └── index.ts               # Barrel export
│
├── hooks/
│   └── useProducts.ts              # Custom hook for product management
│
├── lib/
│   └── supabase/                   # Supabase related utilities
│       ├── calculations.ts         # Business logic calculations
│       ├── client.ts               # Supabase client
│       ├── server.ts               # Supabase server client
│       ├── utils.ts                # Utility functions
│       └── validations/            # Validation schemas
│           ├── product.schema.ts
│           └── transaction.schema.ts
│
└── types/
    ├── product.ts                  # Product type definitions
    ├── database.ts                 # Database type exports
    └── supabase.ts                 # Supabase database schema
```

## 🏗️ Architecture Principles

### 1. **Component Organization**

- **Feature-based folders**: Components are organized by feature/domain (dashboard, products, ui)
- **Barrel exports**: Each folder has an `index.ts` for clean imports
- **Single Responsibility**: Each component has one clear purpose

### 2. **Separation of Concerns**

- **Presentation**: Components focus only on UI
- **Logic**: Business logic in custom hooks (`useProducts`)
- **Data**: Type definitions in `/types` folder
- **Utilities**: Helper functions in `/lib`

### 3. **Reusability**

- **UI Components**: Generic, reusable components in `/components/ui`
- **Custom Hooks**: Shared logic extracted to hooks
- **Type Safety**: TypeScript types/interfaces shared across app

### 4. **Best Practices**

- ✅ Clean imports using barrel exports
- ✅ TypeScript for type safety
- ✅ Component composition over large monolithic components
- ✅ Custom hooks for state management
- ✅ Clear naming conventions
- ✅ Proper folder nesting (max 3 levels)

## 📦 Component Dependencies

### Main Page (`page.tsx`)

```tsx
import {
  Header,
  StatsGrid,
  QuickActions,
  WelcomeSection,
} from "@/components/dashboard";
import { ProductsTable, AddProductModal } from "@/components/products";
import { useProducts } from "@/hooks/useProducts";
```

### Custom Hook (`useProducts`)

- Manages all product state
- Handles form data
- Controls modal visibility
- Calculates total sales

## 🚀 Benefits of This Structure

1. **Maintainability**: Easy to find and update components
2. **Scalability**: Simple to add new features/components
3. **Testability**: Isolated components are easier to test
4. **Readability**: Clear structure, clean imports
5. **Collaboration**: Team members can work on different features without conflicts
6. **Performance**: Code splitting friendly structure

## 📝 Naming Conventions

- **Components**: PascalCase (`ProductsTable.tsx`)
- **Hooks**: camelCase with `use` prefix (`useProducts.ts`)
- **Utilities**: camelCase (`calculations.ts`)
- **Types**: PascalCase for interfaces/types
- **Folders**: kebab-case or camelCase

## 🔄 Adding New Features

1. **New Component**: Add to appropriate feature folder
2. **New Hook**: Add to `/hooks` folder
3. **New Type**: Add to `/types` folder
4. **Update Barrel Exports**: Add to `index.ts` files

Example:

```tsx
// Add new component
src / components / dashboard / ReportsSection.tsx;

// Export it
src / components / dashboard / index.ts;
export { ReportsSection } from "./ReportsSection";

// Use it
import { ReportsSection } from "@/components/dashboard";
```

## 🎯 Next Steps

- Add more dashboard features (sales, returns, reports)
- Implement data persistence with Supabase
- Add authentication
- Create admin panel
- Add data visualization charts
- Implement search & filters
