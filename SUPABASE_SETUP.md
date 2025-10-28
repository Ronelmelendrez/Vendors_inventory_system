# Supabase Database Setup for Authentication

## Create the user_profiles table

Run this SQL in your Supabase SQL editor:

```sql
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

-- Create function to handle new user creation
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

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert demo users (after creating them in Supabase Auth)
-- Admin user: admin@vendor.com / admin123
-- Branch user: branch@vendor.com / branch123

-- You'll need to create these users in Supabase Auth first, then update their profiles:
-- UPDATE user_profiles SET role = 'admin' WHERE email = 'admin@vendor.com';
-- UPDATE user_profiles SET role = 'branch', branch_name = 'Main Branch' WHERE email = 'branch@vendor.com';
```

## Update products table to include branch tracking

```sql
-- Add branch_id column to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS branch_id UUID REFERENCES user_profiles(id);
ALTER TABLE products ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES user_profiles(id);

-- Add branch_id to item_recording_log
ALTER TABLE item_recording_log ADD COLUMN IF NOT EXISTS branch_id UUID REFERENCES user_profiles(id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_products_branch_id ON products(branch_id);
CREATE INDEX IF NOT EXISTS idx_item_recording_log_branch_id ON item_recording_log(branch_id);

-- Update RLS policies for products
CREATE POLICY "Branches can insert own products"
  ON products FOR INSERT
  WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'branch')
  );

CREATE POLICY "Branches can view own products"
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
```

## Create Demo Users in Supabase

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

## Environment Variables

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```
