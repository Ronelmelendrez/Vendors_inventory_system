# Authentication System - User Guide

## 🔐 Authentication System Overview

Your Vendor Management System now has a complete authentication system with role-based access control (RBAC).

## 👥 User Roles

### 1. **Admin**

- Full access to the entire system
- Can view all products from all branches
- See aggregated data from all branches
- Access: `/admin` dashboard

### 2. **Branch**

- Can only add/view their own branch's products
- Records customer purchases
- Limited to branch-specific data
- Access: `/branch` dashboard

## 🚀 How It Works

### Login Flow:

1. User goes to root URL `/`
2. Redirected to `/auth/login`
3. After successful login, redirected based on role:
   - **Admin** → `/admin`
   - **Branch** → `/branch`

### Features:

- ✅ Secure authentication with Supabase
- ✅ Role-based access control
- ✅ Protected routes
- ✅ Automatic redirects
- ✅ Session management
- ✅ Sign out functionality

## 📁 New File Structure

```
src/
├── app/
│   ├── auth/
│   │   └── login/
│   │       └── page.tsx          # Login page
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard
│   ├── branch/
│   │   └── page.tsx              # Branch dashboard
│   └── page.tsx                  # Root redirect
│
├── components/
│   └── auth/
│       └── ProtectedRoute.tsx    # Route protection component
│
├── contexts/
│   └── AuthContext.tsx           # Authentication state management
│
└── types/
    └── auth.ts                   # Auth type definitions
```

## 🔧 Setup Instructions

### 1. Set up Supabase (Follow SUPABASE_SETUP.md)

- Create `user_profiles` table
- Set up Row Level Security policies
- Create demo users

### 2. Environment Variables

Make sure `.env.local` has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Demo Accounts

**Admin Account:**

- Email: admin@vendor.com
- Password: admin123

**Branch Account:**

- Email: branch@vendor.com
- Password: branch123

## 💡 Usage Examples

### For Branch Users:

1. Login with branch credentials
2. Add products that customers purchase
3. View branch-specific statistics
4. All data is automatically tagged with branch ID

### For Admin Users:

1. Login with admin credentials
2. View all products from all branches
3. See aggregated statistics
4. Monitor overall performance

## 🎯 Key Components

### AuthContext

- Manages authentication state
- Provides `user`, `loading`, `signIn`, `signOut`
- Determines `isAdmin` and `isBranch`

### ProtectedRoute

- Wraps pages that require authentication
- Checks user role and permissions
- Redirects unauthorized users

### Header Component

- Shows user info and role
- Logout button
- Different display based on role

## 🔄 Data Flow

**Branch adds product:**

```
Branch User → Add Product → Tagged with branch_id → Stored in DB
```

**Admin views products:**

```
Admin User → View Dashboard → Sees all products from all branches
```

## 🛡️ Security Features

- Row Level Security (RLS) on Supabase
- Client-side route protection
- Session-based authentication
- Secure password handling
- Role verification on every request

## 📊 What's Different Per Role

| Feature                 | Admin | Branch |
| ----------------------- | ----- | ------ |
| View own products       | ✅    | ✅     |
| View all products       | ✅    | ❌     |
| Add products            | ✅    | ✅     |
| See all branch stats    | ✅    | ❌     |
| Access admin dashboard  | ✅    | ❌     |
| Access branch dashboard | ✅    | ✅     |

## 🎨 UI Differences

- **Admin Dashboard**: Shows "Admin Dashboard" in header
- **Branch Dashboard**: Shows branch name in header
- Different welcome messages per role
- Branch dashboard emphasizes "Record Customer Purchases"
