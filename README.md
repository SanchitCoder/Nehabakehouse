# Neha's Bakehouse 🍰

A modern, fully functional bakery e-commerce website built with React, TypeScript, Tailwind CSS, Supabase, and Razorpay.

## Features

### Customer Features
- 🏠 Beautiful homepage with hero section and featured products
- 🛍️ Product catalog with category filtering and search
- 🛒 Shopping cart with persistent storage (localStorage)
- 💳 Checkout process with Razorpay integration
- 📧 Order confirmation with n8n webhook integration
- 📱 Fully responsive design
- 🎨 Warm, inviting bakery-themed design

### Admin Features
- 🔐 Password-protected admin panel
- ➕ Add new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 👁️ View all products in a table

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom bakery theme
- **Database**: Supabase (PostgreSQL)
- **Payment**: Razorpay
- **Routing**: React Router
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nehas-bakehouse
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

The Supabase credentials are already configured in `.env`:
```
VITE_SUPABASE_URL=https://baguciadpvbdqukdwbwc.supabase.co
VITE_SUPABASE_ANON_KEY=<your-key>
```

4. Configure Razorpay and n8n Webhook:

Edit `src/lib/config.ts`:

```typescript
// Replace with your Razorpay Key ID
export const RAZORPAY_KEY_ID = 'YOUR_RAZORPAY_KEY_ID_HERE';

// Replace with your n8n webhook URL
export const WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL_HERE';

// Admin password (default: bakehouse2024)
export const ADMIN_PASSWORD = 'bakehouse2024';
```

### Setting Up Razorpay

See [RAZORPAY_SETUP.md](./RAZORPAY_SETUP.md) for detailed Razorpay setup instructions.

### Setting Up n8n Webhook

1. Set up an n8n workflow with a webhook trigger
2. Copy the webhook URL from n8n
3. Replace `WEBHOOK_URL` in `src/lib/config.ts`

**Webhook Payload Format:**

When an order is completed, the following JSON payload is sent to your n8n webhook:

```json
{
  "orderDate": "2024-11-03T10:30:00.000Z",
  "orderId": "ORD-1699012345678-123",
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "(555) 123-4567",
    "address": "123 Main St, City, State 12345"
  },
  "items": [
    {
      "productName": "Classic Chocolate Cake",
      "quantity": 1,
      "price": 45.00,
      "subtotal": 45.00
    }
  ],
  "orderSummary": {
    "subtotal": 45.00,
    "tax": 3.60,
    "total": 48.60
  },
  "specialInstructions": "Please add birthday candles",
  "paymentStatus": "completed"
}
```

### Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Admin Panel

Access the admin panel at `/admin`

**Default Password**: `bakehouse2024`

The admin panel allows you to:
- View all products in a table
- Add new products with name, description, price, category, image URL, and featured status
- Edit existing products
- Delete products
- Mark products as featured (appears on homepage)

## Database Schema

### Products Table
- `id` (uuid) - Unique identifier
- `name` (text) - Product name
- `description` (text) - Product description
- `price` (decimal) - Product price
- `category` (text) - One of: Cakes, Pastries, Breads, Cookies, Custom Orders
- `image_url` (text) - URL to product image
- `featured` (boolean) - Whether to show on homepage
- `created_at` (timestamp) - Creation timestamp
- `updated_at` (timestamp) - Last update timestamp

### Orders Table
- `id` (uuid) - Unique identifier
- `order_id` (text) - Human-readable order ID
- `customer_name` (text) - Customer name
- `customer_email` (text) - Customer email
- `customer_phone` (text) - Customer phone
- `delivery_address` (text) - Delivery address
- `special_instructions` (text) - Order notes
- `items` (jsonb) - Array of order items
- `subtotal` (decimal) - Order subtotal
- `tax` (decimal) - Tax amount
- `total` (decimal) - Total amount
- `payment_status` (text) - Payment status
- `stripe_payment_id` (text) - Stripe payment ID
- `webhook_sent` (boolean) - Webhook delivery status
- `created_at` (timestamp) - Order timestamp

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with header/footer
│   ├── ProductCard.tsx # Product display card
│   └── Toast.tsx       # Toast notifications
├── context/            # React context providers
│   └── CartContext.tsx # Shopping cart state management
├── lib/                # Utilities and configuration
│   ├── config.ts       # App configuration (Stripe, Webhook)
│   ├── database.types.ts # Supabase types
│   ├── supabase.ts     # Supabase client
│   └── types.ts        # TypeScript types
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── Products.tsx    # Product catalog
│   ├── Cart.tsx        # Shopping cart
│   ├── Checkout.tsx    # Checkout form
│   ├── OrderSuccess.tsx # Order confirmation
│   ├── Contact.tsx     # Contact page
│   └── Admin.tsx       # Admin panel
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## Design Theme

- **Color Palette**:
  - Creamy beige/butter yellow (#FFF3E0)
  - Warm pastel pink (#FADADD)
  - Soft brown/chocolate (#6B4226)
  - White frosting tone (#FFFFFF)

- **Fonts**:
  - Headings: Pacifico (script font)
  - Body: Poppins (clean sans-serif)

- **Mood**: Cozy, homemade, heartfelt with warm tones that evoke comfort and nostalgia

## Security

- Admin panel protected with password authentication
- Supabase Row Level Security (RLS) enabled on all tables
- Products table: Public read access, admin-only write access
- Orders table: Admin/service role only access
- Session-based admin authentication

## Production Deployment

Before deploying to production:

1. Update `RAZORPAY_KEY_ID` with your live Razorpay Key ID
2. Configure your n8n webhook URL
3. Change the `ADMIN_PASSWORD` in `src/lib/config.ts`
4. Set up a backend API for creating Razorpay orders (see RAZORPAY_SETUP.md)
5. Run `npm run build` to create production build
6. Deploy the `dist` folder to your hosting service

## Sample Data

The database comes pre-populated with 14 sample products across all categories:
- Cakes (3 products, including featured items)
- Pastries (3 products)
- Breads (3 products)
- Cookies (3 products)
- Custom Orders (2 products)

## Support

For questions or issues, please contact hello@nehasbakehouse.com

## License

This project is licensed under the MIT License.
