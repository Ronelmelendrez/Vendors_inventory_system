# Profile Module

A comprehensive user profile system with stats, activity tracking, and achievements.

## Features

### 1. User Profile Card (`UserProfile.tsx`)
- **Avatar Display**: Shows user initials in gradient background
- **Personal Information**: Name, email, phone, address
- **Role & Branch**: Displays user role and associated branch
- **Join Date**: Shows when the user joined the system
- **Responsive Design**: Adapts to mobile and desktop layouts
- **Dark Mode**: Full support for light and dark themes

### 2. Profile Statistics (`ProfileStats.tsx`)
- **Activity Metrics**: Products, Sales, Revenue, Growth
- **Trend Indicators**: Shows increase/decrease percentages
- **Visual Icons**: Each metric has a distinctive icon
- **Grid Layout**: Responsive 1-4 column grid
- **Dark Mode**: Themed cards and text

### 3. Recent Activity (`ProfileActivity.tsx`)
- **Activity Timeline**: Last 10 user actions
- **Type Indicators**: Color-coded by activity type
  - 🔵 Product actions (blue)
  - 🟢 Sales (green)
  - 🟣 Settings changes (purple)
  - 🟠 Reports (orange)
- **Timestamps**: Relative time display (e.g., "2 hours ago")
- **Hover Effects**: Interactive list items

### 4. Achievement Badges (`ProfileBadges.tsx`)
- **Badge System**: 6 unique achievements
  - ⭐ Early Adopter
  - 🏆 Top Seller
  - ⚡ Quick Starter
  - 🎯 Inventory Master
  - ❤️ Customer Favorite
  - 🏅 Achievement Hunter
- **Visual States**: Earned vs. locked badges
- **Tooltips**: Hover to see badge descriptions
- **Gradient Design**: Each badge has unique colors

## Usage

### Viewing Profile
Navigate to `/profile` from the user menu in the header:
1. Click on user avatar in top-right
2. Select "View Profile"
3. View your stats, activity, and achievements

### Profile Page Layout
```tsx
/profile
├── UserProfile (left column)
└── Right column
    ├── ProfileStats
    ├── ProfileBadges
    └── ProfileActivity
```

## Components

### UserProfile
```tsx
import { UserProfile } from "@/components/profile/UserProfile";

<UserProfile />
```

Displays:
- User avatar with initials
- Full name and role
- Contact information
- Location details
- Join date

### ProfileStats
```tsx
import { ProfileStats } from "@/components/profile/ProfileStats";

<ProfileStats />
```

Shows 4 key metrics:
- Total Products
- Total Sales
- Revenue
- Growth percentage

### ProfileActivity
```tsx
import { ProfileActivity } from "@/components/profile/ProfileActivity";

<ProfileActivity />
```

Lists recent user activities with:
- Activity type icon
- Description
- Timestamp

### ProfileBadges
```tsx
import { ProfileBadges } from "@/components/profile/ProfileBadges";

<ProfileBadges />
```

Displays achievement badges with:
- Visual badge icons
- Earned/locked states
- Earned dates
- Tooltips on hover

## Data Management

### useUserProfile Hook
```tsx
import { useUserProfile } from "@/hooks/useUserProfile";

const {
  stats,
  activities,
  badges,
  isLoading,
  updateStats,
  addActivity,
  earnBadge,
  refreshProfile,
} = useUserProfile();
```

#### Methods

**updateStats(newStats)**
```tsx
updateStats({
  totalProducts: 10,
  revenue: 5000,
  salesChange: 15,
});
```

**addActivity(activity)**
```tsx
addActivity({
  type: "product",
  description: "Added new product: Widget X",
  timestamp: "Just now",
});
```

**earnBadge(badgeId)**
```tsx
earnBadge("2"); // Earn Top Seller badge
```

## localStorage Schema

### User Profile
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St",
  "city": "New York",
  "country": "USA",
  "joinedDate": "1/15/2024"
}
```

### User Stats
```json
{
  "totalProducts": 25,
  "totalSales": 150,
  "revenue": 12500,
  "growth": 8.5,
  "productsChange": 10,
  "salesChange": 15,
  "revenueChange": 20,
  "growthChange": 5
}
```

### User Activities
```json
[
  {
    "id": "1",
    "type": "product",
    "description": "Added new product",
    "timestamp": "2 hours ago"
  }
]
```

### User Badges
```json
[
  {
    "id": "1",
    "name": "Early Adopter",
    "description": "One of the first users",
    "earned": true,
    "earnedDate": "Jan 2024"
  }
]
```

## Styling

### Dark Mode Classes
All components support dark mode with these patterns:

```tsx
// Backgrounds
className="bg-white dark:bg-gray-800"

// Text
className="text-gray-900 dark:text-gray-100"

// Borders
className="border dark:border-gray-700"

// Hover states
className="hover:bg-gray-50 dark:hover:bg-gray-700"
```

### Responsive Design
```tsx
// Grid columns
className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"

// Layout
className="lg:col-span-1" // Left column
className="lg:col-span-2" // Right column
```

## Integration

### Header Navigation
Profile link added to user dropdown menu:
- "View Profile" button
- Navigates to `/profile`
- Closes menu on click

### Settings Integration
Profile data is shared with Settings page:
- Edit profile information in Settings
- Changes reflect in Profile view
- Synchronized via localStorage

## Navigation Flow

```
Header → User Menu → View Profile → /profile
                   → Settings → /settings
                   → Sign Out
```

## Dark Mode Support

All profile components fully support dark mode:
- Automatic theme detection
- Smooth transitions
- Themed gradients
- High contrast text
- Accessible colors

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Readable contrast ratios
- Responsive touch targets

## Future Enhancements

Potential additions:
- Edit profile from profile page
- Export profile data
- Share achievements
- Activity filtering
- Custom badge creation
- Profile completeness meter
- Activity charts
- Badge progress tracking

## Example Usage

```tsx
"use client";

import { UserProfile, ProfileStats, ProfileActivity, ProfileBadges } from "@/components/profile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <UserProfile />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <ProfileStats />
            <ProfileBadges />
            <ProfileActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Related Features

- Settings Module (`/settings`) - Edit profile information
- Theme System - Dark/light mode toggle
- Authentication - User context and session management
