# Settings Module

This module provides comprehensive profile and account management functionality for both admin and branch users.

## Features

### 1. Profile Management
- **Personal Information**: Update first name, last name, phone, address, city, and country
- **Email Display**: View email address (cannot be changed)
- **Branch Information**: Branch users can view their assigned branch name
- **Auto-save**: Profile data is saved to localStorage for persistence
- **Loading States**: Visual feedback during save operations

### 2. Password Management
- **Current Password**: Required for verification
- **New Password**: Must be at least 8 characters
- **Password Confirmation**: Ensures accuracy
- **Toggle Visibility**: Show/hide password fields
- **Validation**: Client-side validation before submission

### 3. Account Settings
- **Notification Preferences**:
  - Email Notifications
  - Sales Alerts
  - Low Stock Alerts
  - Weekly Reports
- **Privacy & Security**: Information about data protection
- **Account Deletion**: Option to delete account (with double confirmation)

## Components

### SettingsPage (`/settings/page.tsx`)
Main settings page with three sections:
- Profile Information form
- Password Change section
- Account Settings section

### PasswordChangeSection
Standalone component for password changes:
```tsx
<PasswordChangeSection />
```

### AccountSettings
Notification and account management:
```tsx
<AccountSettings />
```

## Custom Hooks

### useProfile
Manages profile form state and persistence:
```tsx
const {
  formData,
  isLoading,
  isSaved,
  handleInputChange,
  handleSubmit,
  handleReset,
} = useProfile();
```

**Features**:
- Auto-loads saved profile from localStorage
- Handles form input changes
- Submits with loading states
- Resets to saved values
- Shows save confirmation

## Data Storage

### Profile Data
Stored in localStorage as `userProfile`:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St",
  "city": "New York",
  "country": "USA"
}
```

### Notification Settings
Stored in localStorage as `notificationSettings`:
```json
{
  "emailNotifications": true,
  "salesAlerts": true,
  "lowStockAlerts": true,
  "weeklyReports": false
}
```

## Navigation

Access settings from the Header dropdown menu:
1. Click user avatar (top right)
2. Select "Settings" from dropdown
3. Redirects to `/settings` page

## User Roles

### Admin Users
- Full access to all settings
- Can modify profile information
- Can change password
- Can manage notifications

### Branch Users
- Full access to all settings
- Can view branch name (read-only)
- Same capabilities as admin for personal settings

## Security

- Email addresses cannot be changed
- Branch names cannot be modified by branch users
- Password changes require current password
- Account deletion requires double confirmation
- All data is encrypted in localStorage

## Future Enhancements

- [ ] Profile image upload
- [ ] Two-factor authentication
- [ ] Session management
- [ ] Activity log
- [ ] Export user data
- [ ] Email verification for changes
- [ ] API integration for real-time updates
- [ ] Password strength indicator
- [ ] Recently used devices

## Usage Example

```tsx
// Navigate to settings
router.push("/settings");

// Or from Header dropdown
<Header /> // Settings option automatically included
```

## File Structure

```
frontend/src/
├── app/
│   └── settings/
│       └── page.tsx              # Main settings page
├── components/
│   └── settings/
│       ├── PasswordChangeSection.tsx
│       ├── AccountSettings.tsx
│       └── index.ts             # Barrel exports
├── hooks/
│   └── useProfile.ts            # Profile management hook
└── types/
    └── user.ts                  # User and Profile types
```

## Dependencies

- React hooks (useState, useEffect)
- Next.js routing (useRouter)
- Lucide icons
- AuthContext for user data
- localStorage for persistence

## Notes

- All forms include proper validation
- Loading states prevent double submissions
- Cancel buttons reset to last saved state
- Email and branch fields are disabled (read-only)
- Notification toggles save automatically
- Profile changes require manual save
