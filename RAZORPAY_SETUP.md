# Razorpay Integration Setup Guide

This guide will help you set up Razorpay payment integration for Neha's Bakehouse.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Creating a Razorpay Account](#creating-a-razorpay-account)
3. [Getting Your API Keys](#getting-your-api-keys)
4. [Configuring the Application](#configuring-the-application)
5. [Backend Setup (Recommended)](#backend-setup-recommended)
6. [Testing the Integration](#testing-the-integration)
7. [Production Deployment](#production-deployment)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

- A Razorpay account (sign up at https://razorpay.com/)
- Node.js 18+ installed
- Basic understanding of API integration

## Creating a Razorpay Account

1. **Sign Up for Razorpay**
   - Go to https://razorpay.com/
   - Click on "Sign Up" or "Get Started"
   - Fill in your business details:
     - Business name
     - Business type
     - Email address
     - Phone number
     - Password

2. **Complete KYC Verification**
   - Provide your business documents
     - PAN card
     - Bank account details
     - Business address proof
   - Wait for verification (usually 24-48 hours)

3. **Activate Your Account**
   - Once verified, you'll receive a confirmation email
   - Log in to your Razorpay Dashboard

## Getting Your API Keys

### For Test Mode (Development)

1. **Access Test Mode**
   - Log in to your Razorpay Dashboard
   - Go to Settings → API Keys
   - Make sure you're in **Test Mode** (toggle in top right)

2. **Generate Test Keys**
   - Click on "Generate Key"
   - Copy your **Key ID** (starts with `rzp_test_`)
   - Copy your **Key Secret** (starts with `rzp_test_` - only shown once!)
   - **Important**: Save the Key Secret securely. You won't be able to see it again.

### For Live Mode (Production)

1. **Switch to Live Mode**
   - Complete KYC verification first
   - Toggle to **Live Mode** in the dashboard
   - Go to Settings → API Keys

2. **Generate Live Keys**
   - Click on "Generate Key"
   - Copy your **Key ID** (starts with `rzp_live_`)
   - Copy your **Key Secret** (starts with `rzp_live_`)

## Configuring the Application

### Step 1: Update Configuration File

Edit `src/lib/config.ts`:

```typescript
export const RAZORPAY_KEY_ID = 'rzp_test_YOUR_KEY_ID_HERE'; // Replace with your Key ID
export const WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL_HERE';
export const ADMIN_PASSWORD = 'bakehouse2024';
```

### Step 2: Verify Razorpay Script

The Razorpay checkout script is already included in `index.html`:

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### Step 3: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the checkout page
3. Fill in the order details
4. Click "Place Order"
5. You should see the Razorpay payment modal

## Backend Setup (Recommended)

⚠️ **Important**: For production, you should create Razorpay orders on your backend server for security reasons. The current implementation uses a mock order ID for demo purposes.

### Why You Need a Backend

- **Security**: Your Razorpay Key Secret should never be exposed in frontend code
- **Order Creation**: Razorpay orders should be created on the server
- **Payment Verification**: Payment signatures should be verified on the server
- **Webhook Handling**: Razorpay webhooks should be handled on your backend

### Backend Implementation Example

Here's a basic example using Node.js/Express:

#### 1. Install Razorpay SDK

```bash
npm install razorpay
```

#### 2. Create Order Endpoint

```javascript
// server.js
const express = require('express');
const Razorpay = require('razorpay');
const app = express();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.post('/api/create-razorpay-order', async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    
    const options = {
      amount: amount, // Amount in paise
      currency: 'INR',
      receipt: orderId,
      notes: {
        orderId: orderId
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

#### 3. Update Frontend Checkout

Replace the `createRazorpayOrder` function in `src/pages/Checkout.tsx`:

```typescript
const createRazorpayOrder = async (amount: number, orderId: string) => {
  try {
    const response = await fetch('/api/create-razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId })
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to create order');
    }
    
    return data.razorpayOrderId;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};
```

#### 4. Payment Verification Endpoint

```javascript
const crypto = require('crypto');

app.post('/api/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  const text = `${razorpay_order_id}|${razorpay_payment_id}`;
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(text)
    .digest('hex');
  
  if (generated_signature === razorpay_signature) {
    res.json({ success: true, verified: true });
  } else {
    res.status(400).json({ success: false, verified: false });
  }
});
```

## Testing the Integration

### Test Cards (Test Mode Only)

Razorpay provides test cards for testing:

**Successful Payment:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits (e.g., `123`)
- Expiry: Any future date (e.g., `12/25`)
- Name: Any name

**Payment Failure:**
- Card Number: `4000 0000 0000 0002`

**3D Secure:**
- Card Number: `4012 0010 3714 1112`
- This will trigger OTP verification

### Testing Steps

1. Add products to cart
2. Go to checkout
3. Fill in customer details
4. Click "Place Order"
5. Use test card details above
6. Complete payment
7. Verify order success page appears

## Production Deployment

### Before Going Live

1. **Complete KYC Verification**
   - Ensure all business documents are verified
   - Bank account is linked and verified

2. **Switch to Live Mode**
   - In Razorpay Dashboard, toggle to Live Mode
   - Generate new Live API keys
   - Update `RAZORPAY_KEY_ID` in `src/lib/config.ts` with live Key ID

3. **Set Up Backend**
   - Deploy your backend server
   - Set environment variables:
     ```
     RAZORPAY_KEY_ID=rzp_live_...
     RAZORPAY_KEY_SECRET=rzp_live_...
     ```
   - Update frontend API endpoints to point to production backend

4. **Configure Webhooks** (Optional but Recommended)
   - In Razorpay Dashboard, go to Settings → Webhooks
   - Add webhook URL: `https://your-domain.com/api/razorpay-webhook`
   - Select events:
     - `payment.captured`
     - `payment.failed`
     - `order.paid`

5. **Test with Real Cards** (Small Amounts)
   - Test with actual debit/credit cards
   - Start with small amounts (₹1, ₹10)
   - Verify payments are received in your account

### Security Best Practices

1. **Never expose Key Secret**
   - Always keep Key Secret on backend
   - Use environment variables
   - Never commit to version control

2. **Verify Payment Signatures**
   - Always verify payment signatures on backend
   - Don't trust payment status from frontend alone

3. **Use HTTPS**
   - Always use HTTPS in production
   - Razorpay requires HTTPS for live mode

4. **Implement Webhooks**
   - Use webhooks for payment confirmation
   - Don't rely solely on frontend callbacks

## Troubleshooting

### Common Issues

#### 1. Razorpay Modal Not Opening

**Problem**: Payment modal doesn't appear when clicking "Place Order"

**Solutions**:
- Check browser console for errors
- Verify Razorpay script is loaded: `window.Razorpay` should exist
- Check if `RAZORPAY_KEY_ID` is correctly set
- Ensure you're using a valid Key ID format (`rzp_test_...` or `rzp_live_...`)

#### 2. "Invalid Key" Error

**Problem**: Error message says "Invalid Key"

**Solutions**:
- Verify you're using the correct Key ID
- Check if you're using test Key ID in test mode
- Ensure Key ID is not truncated or has extra spaces
- Make sure your Razorpay account is active

#### 3. Payment Fails Immediately

**Problem**: Payment fails without showing payment form

**Solutions**:
- Check if amount is valid (minimum ₹1)
- Verify currency is set to 'INR'
- Check browser console for detailed error messages
- Ensure you're using test cards in test mode

#### 4. Order Not Created

**Problem**: Backend order creation fails

**Solutions**:
- Verify Key Secret is correct
- Check if amount is in paise (multiply by 100)
- Ensure backend server is running
- Check CORS settings if frontend and backend are on different domains

#### 5. Payment Success but Order Not Recorded

**Problem**: Payment succeeds but order details are lost

**Solutions**:
- Check webhook URL configuration
- Verify webhook handler is working
- Check if payment signature verification is passing
- Review browser console and server logs

### Getting Help

- **Razorpay Documentation**: https://razorpay.com/docs/
- **Razorpay Support**: support@razorpay.com
- **Razorpay Dashboard**: https://dashboard.razorpay.com/

## Additional Resources

- [Razorpay API Documentation](https://razorpay.com/docs/api/)
- [Razorpay Checkout Integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/)
- [Razorpay Webhooks](https://razorpay.com/docs/webhooks/)
- [Razorpay Test Cards](https://razorpay.com/docs/payments/test-cards/)

## Notes

- The current implementation uses a mock order ID for demo purposes
- For production, always create orders on your backend
- Always verify payment signatures on the server
- Keep your Key Secret secure and never expose it in frontend code
- Test thoroughly in test mode before going live


