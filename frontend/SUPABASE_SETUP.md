# Supabase Database Setup for Authentication

## Step 1: Create all required tables

Run this SQL in your Supabase SQL editor:

```sql
-- Create user_profiles table first
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'branch')),
  branch_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  sku TEXT PRIMARY KEY,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  default_unit_price NUMERIC(10, 2) NOT NULL,
  initial_stock_count INTEGER NOT NULL DEFAULT 0,
  branch_id UUID REFERENCES user_profiles(id),
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create item_recording_log table
CREATE TABLE IF NOT EXISTS item_recording_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT NOT NULL REFERENCES products(sku),
  date_time TIMESTAMPTZ NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('Sale', 'Return', 'Inventory Count')),
  quantity INTEGER NOT NULL,
  actual_unit_price NUMERIC(10, 2) NOT NULL,
  payment_method TEXT,
  vendor_location TEXT,
  branch_id UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create current_inventory view
CREATE OR REPLACE VIEW current_inventory AS
SELECT
  p.sku,
  p.item_name,
  p.category,
  p.initial_stock_count + COALESCE(SUM(
    CASE
      WHEN i.transaction_type = 'Sale' THEN -i.quantity
      WHEN i.transaction_type = 'Return' THEN i.quantity
      WHEN i.transaction_type = 'Inventory Count' THEN i.quantity
      ELSE 0
    END
  ), 0) as current_stock,
  (p.initial_stock_count + COALESCE(SUM(
    CASE
      WHEN i.transaction_type = 'Sale' THEN -i.quantity
      WHEN i.transaction_type = 'Return' THEN i.quantity
      WHEN i.transaction_type = 'Inventory Count' THEN i.quantity
      ELSE 0
    END
  ), 0)) * p.default_unit_price as current_inventory_value,
  GREATEST(p.updated_at, MAX(i.created_at)) as last_updated
FROM products p
LEFT JOIN item_recording_log i ON p.sku = i.sku
GROUP BY p.sku, p.item_name, p.category, p.initial_stock_count, p.default_unit_price, p.updated_at;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_branch_id ON products(branch_id);
CREATE INDEX IF NOT EXISTS idx_products_created_by ON products(created_by);
CREATE INDEX IF NOT EXISTS idx_item_recording_log_sku ON item_recording_log(sku);
CREATE INDEX IF NOT EXISTS idx_item_recording_log_branch_id ON item_recording_log(branch_id);
CREATE INDEX IF NOT EXISTS idx_item_recording_log_date ON item_recording_log(date_time);
```

## Step 2: Enable Row Level Security and Create Policies

```sql
-- Enable Row Level Security on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE item_recording_log ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Products Policies
CREATE POLICY "Branches can insert own products"
  ON products FOR INSERT
  WITH CHECK (
    auth.uid() = created_by
  );

CREATE POLICY "Users can view own branch products"
  ON products FOR SELECT
  USING (
    branch_id = auth.uid() OR
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can view all products"
  ON products FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can update own products"
  ON products FOR UPDATE
  USING (
    branch_id = auth.uid() OR
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Item Recording Log Policies
CREATE POLICY "Users can insert own transactions"
  ON item_recording_log FOR INSERT
  WITH CHECK (
    auth.uid() = branch_id OR
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can view own transactions"
  ON item_recording_log FOR SELECT
  USING (
    branch_id = auth.uid() OR
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can view all transactions"
  ON item_recording_log FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

## Step 3: Create Functions and Triggers

````sql
-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'branch')),
  branch_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

## Step 3: Create Functions and Triggers

```sql
-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role, branch_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'branch'),
    NEW.raw_user_meta_data->>'branch_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at on products
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
````

## Step 4: Create Demo Users in Supabase

1. Go to Authentication > Users in your Supabase dashboard
2. Click "Add user" and create:

   - **Admin**: admin@vendor.com (password: admin123)
   - **Branch**: branch@vendor.com (password: branch123)

3. Then run this SQL to set their roles:

```sql
UPDATE user_profiles
SET role = 'admin'
WHERE email = 'admin@vendor.com';

UPDATE user_profiles
SET role = 'branch', branch_name = 'Main Branch'
WHERE email = 'branch@vendor.com';
```

## Step 5: Insert Sample Data (Optional)

```sql
-- Insert some sample products for testing (as admin or branch user)
-- Make sure to replace 'your-user-id' with actual user ID from auth.users

-- Sample products
INSERT INTO products (sku, item_name, category, default_unit_price, initial_stock_count, branch_id, created_by)
VALUES
  ('SKU-001', 'Laptop Dell XPS 13', 'Electronics', 1299.99, 10, 'branch-user-id', 'branch-user-id'),
  ('SKU-002', 'Wireless Mouse', 'Electronics', 29.99, 50, 'branch-user-id', 'branch-user-id'),
  ('SKU-003', 'Office Chair', 'Furniture', 199.99, 20, 'branch-user-id', 'branch-user-id')
ON CONFLICT (sku) DO NOTHING;
```

## Environment Variables

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```
