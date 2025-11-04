/*
  # Neha's Bakehouse Database Schema

  ## Overview
  This migration creates the core database structure for the bakery website,
  including products and orders management with proper security policies.

  ## New Tables
  
  ### `products`
  Stores all bakery items available for purchase
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `description` (text) - Product description
  - `price` (decimal) - Product price
  - `category` (text) - Product category (Cakes, Pastries, Breads, Cookies, Custom Orders)
  - `image_url` (text) - URL to product image
  - `featured` (boolean) - Whether product is featured on homepage
  - `created_at` (timestamptz) - When product was created
  - `updated_at` (timestamptz) - When product was last updated

  ### `orders`
  Stores customer orders after successful payment
  - `id` (uuid, primary key) - Unique order identifier
  - `order_id` (text) - Human-readable order ID
  - `customer_name` (text) - Customer's name
  - `customer_email` (text) - Customer's email
  - `customer_phone` (text) - Customer's phone number
  - `delivery_address` (text) - Delivery address
  - `special_instructions` (text) - Special instructions for the order
  - `items` (jsonb) - Array of order items with product details
  - `subtotal` (decimal) - Order subtotal
  - `tax` (decimal) - Tax amount
  - `total` (decimal) - Total amount paid
  - `payment_status` (text) - Payment status (completed, pending, failed)
  - `stripe_payment_id` (text) - Stripe payment intent ID
  - `webhook_sent` (boolean) - Whether order was sent to n8n webhook
  - `created_at` (timestamptz) - When order was created

  ## Security
  
  ### Products Table
  - Enable RLS on products table
  - Allow public read access (anyone can view products)
  - Restrict write operations (admin only via service role)
  
  ### Orders Table
  - Enable RLS on orders table
  - Restrict all access (admin only via service role)
  - Orders are created from backend/edge functions only
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  category text NOT NULL CHECK (category IN ('Cakes', 'Pastries', 'Breads', 'Cookies', 'Custom Orders')),
  image_url text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  delivery_address text NOT NULL,
  special_instructions text DEFAULT '',
  items jsonb NOT NULL,
  subtotal decimal(10,2) NOT NULL CHECK (subtotal >= 0),
  tax decimal(10,2) NOT NULL CHECK (tax >= 0),
  total decimal(10,2) NOT NULL CHECK (total >= 0),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('completed', 'pending', 'failed')),
  stripe_payment_id text,
  webhook_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Products policies: Public read access
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Orders policies: No public access (admin/service role only)
CREATE POLICY "No public access to orders"
  ON orders FOR ALL
  TO anon, authenticated
  USING (false);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);

-- Insert sample products
INSERT INTO products (name, description, price, category, image_url, featured) VALUES
  ('Classic Chocolate Cake', 'Rich, moist chocolate cake with smooth chocolate ganache frosting', 45.00, 'Cakes', 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', true),
  ('Red Velvet Cake', 'Luxurious red velvet cake with cream cheese frosting', 50.00, 'Cakes', 'https://images.pexels.com/photos/3928854/pexels-photo-3928854.jpeg', true),
  ('Vanilla Cupcakes', 'Light and fluffy vanilla cupcakes with buttercream frosting (6 pack)', 18.00, 'Cakes', 'https://images.pexels.com/photos/1028704/pexels-photo-1028704.jpeg', true),
  ('Croissants', 'Buttery, flaky French croissants (4 pack)', 12.00, 'Pastries', 'https://images.pexels.com/photos/2135677/pexels-photo-2135677.jpeg', false),
  ('Cinnamon Rolls', 'Warm cinnamon rolls with cream cheese icing (6 pack)', 15.00, 'Pastries', 'https://images.pexels.com/photos/3850835/pexels-photo-3850835.jpeg', true),
  ('Danish Pastries', 'Assorted Danish pastries with fruit and cream (6 pack)', 16.00, 'Pastries', 'https://images.pexels.com/photos/2135677/pexels-photo-2135677.jpeg', false),
  ('Sourdough Bread', 'Artisan sourdough bread with crispy crust', 8.00, 'Breads', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg', false),
  ('Whole Wheat Bread', 'Healthy whole wheat bread, perfect for sandwiches', 6.00, 'Breads', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg', false),
  ('Baguette', 'Traditional French baguette with airy crumb', 5.00, 'Breads', 'https://images.pexels.com/photos/2434272/pexels-photo-2434272.jpeg', false),
  ('Chocolate Chip Cookies', 'Classic chocolate chip cookies (12 pack)', 10.00, 'Cookies', 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg', false),
  ('Sugar Cookies', 'Decorated sugar cookies, perfect for gifts (12 pack)', 12.00, 'Cookies', 'https://images.pexels.com/photos/1788671/pexels-photo-1788671.jpeg', false),
  ('Oatmeal Raisin Cookies', 'Chewy oatmeal cookies with plump raisins (12 pack)', 10.00, 'Cookies', 'https://images.pexels.com/photos/3983078/pexels-photo-3983078.jpeg', false),
  ('Custom Birthday Cake', 'Custom decorated birthday cake - contact us for design consultation', 75.00, 'Custom Orders', 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg', false),
  ('Custom Wedding Cake', 'Elegant custom wedding cake - pricing starts at base rate', 200.00, 'Custom Orders', 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg', false);
