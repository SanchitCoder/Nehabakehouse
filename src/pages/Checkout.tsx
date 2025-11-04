import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Wallet } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RAZORPAY_KEY_ID, WEBHOOK_URL } from '../lib/config';
import Toast, { useToast } from '../components/Toast';
import type { CheckoutFormData, OrderData } from '../lib/types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, total, clearCart } = useCart();
  const { toast, showToast, hideToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cop'>('razorpay');

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialInstructions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Navigate to cart if empty - moved to useEffect to avoid render warning
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart.length, navigate]);

  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  };

  const sendToWebhook = async (orderData: OrderData) => {
    try {
      if (!WEBHOOK_URL || WEBHOOK_URL.trim() === '' || WEBHOOK_URL.includes('YOUR_N8N_WEBHOOK_URL')) {
        console.warn('Webhook URL not configured');
        return false;
      }

      // Prepare comprehensive webhook payload with all order details
      const webhookPayload = {
        // Order Information
        orderId: orderData.orderId,
        orderDate: orderData.orderDate,
        
        // Customer Information (from form)
        customer: {
          name: orderData.customer.name,
          email: orderData.customer.email,
          phone: orderData.customer.phone,
          address: orderData.customer.address,
        },
        
        // Order Items (Products with quantities and prices)
        items: orderData.items.map(item => ({
          productName: item.productName,
          quantity: item.quantity,
          pricePerUnit: item.price,
          subtotal: item.subtotal,
        })),
        
        // Order Summary (Amounts)
        orderSummary: {
          subtotal: orderData.orderSummary.subtotal,
          tax: orderData.orderSummary.tax,
          total: orderData.orderSummary.total,
          amountPaid: orderData.orderSummary.total, // Explicit amount paid
        },
        
        // Additional Information
        specialInstructions: orderData.specialInstructions || '',
        paymentMethod: orderData.paymentMethod,
        paymentStatus: orderData.paymentStatus,
        
        // Payment Gateway Details (if applicable)
        ...(orderData.razorpayPaymentId && {
          razorpay: {
            paymentId: orderData.razorpayPaymentId,
            orderId: orderData.razorpayOrderId,
            signature: orderData.razorpaySignature,
          },
        }),
      };

      console.log('Sending order data to webhook:', JSON.stringify(webhookPayload, null, 2));

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!response.ok) {
        console.error('Webhook failed:', response.statusText);
        return false;
      }

      console.log('Webhook sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending to webhook:', error);
      return false;
    }
  };

  const createRazorpayOrder = async (_amount: number, _orderId: string): Promise<string | null> => {
    try {
      // In production, you should create an order on your backend first
      // and get the Razorpay order ID from there for security
      // This is a simplified version for demo purposes
      
      // For production, make an API call to your backend:
      // const response = await fetch('/api/create-razorpay-order', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount, orderId })
      // });
      // const { razorpayOrderId } = await response.json();
      // return razorpayOrderId;
      
      // For demo, return null to use direct payment (without order_id)
      // In production, always use order_id from backend
      return null;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error;
    }
  };

  const handleRazorpayPayment = async (orderData: OrderData) => {
    if (!window.Razorpay) {
      showToast('Razorpay SDK not loaded. Please refresh the page.', 'error');
      return false;
    }

    try {
      const amountInPaise = Math.round(orderData.orderSummary.total * 100); // Convert to paise
      const razorpayOrderId = await createRazorpayOrder(amountInPaise, orderData.orderId);

      const options: any = {
        key: RAZORPAY_KEY_ID,
        amount: amountInPaise,
        currency: 'INR',
        name: "Neha's Bakehouse",
        description: `Order #${orderData.orderId}`,
        prefill: {
          name: orderData.customer.name,
          email: orderData.customer.email,
          contact: orderData.customer.phone,
        },
        theme: {
          color: '#F97316', // Orange color matching the theme
        },
        handler: async function (response: any) {
          // Payment successful
          orderData.paymentStatus = 'completed';
          orderData.paymentMethod = 'razorpay';
          orderData.razorpayPaymentId = response.razorpay_payment_id;
          orderData.razorpayOrderId = response.razorpay_order_id || null;
          orderData.razorpaySignature = response.razorpay_signature;

          // Send to webhook
          const webhookSent = await sendToWebhook(orderData);
          
          clearCart();
          showToast('Payment successful! Order placed.', 'success');

          setTimeout(() => {
            navigate('/order-success', {
              state: {
                orderId: orderData.orderId,
                orderData,
                webhookSent,
              },
            });
          }, 1000);
        },
        modal: {
          ondismiss: function() {
            showToast('Payment cancelled', 'info');
            setLoading(false);
          },
        },
      };

      // Only add order_id if we have one (from backend)
      if (razorpayOrderId) {
        options.order_id = razorpayOrderId;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      return true;
    } catch (error) {
      console.error('Error initiating Razorpay payment:', error);
      showToast('Error initiating payment. Please try again.', 'error');
      return false;
    }
  };

  const handleCashOnPickup = async (orderData: OrderData) => {
    try {
      // Set payment method and status for COP
      orderData.paymentMethod = 'cop';
      orderData.paymentStatus = 'pending'; // COP orders are pending until pickup

      // Send to webhook
      const webhookSent = await sendToWebhook(orderData);

      clearCart();
      showToast('Order placed successfully! You will pay when you pick up your order.', 'success');

      setTimeout(() => {
        navigate('/order-success', {
          state: {
            orderId: orderData.orderId,
            orderData,
            webhookSent,
          },
        });
      }, 1000);
    } catch (error) {
      console.error('Error processing COP order:', error);
      showToast('Error processing order. Please try again.', 'error');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    setLoading(true);

    try {
      const orderId = generateOrderId();

      const orderData: OrderData = {
        orderDate: new Date().toISOString(),
        orderId,
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
        items: cart.map(item => ({
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        })),
        orderSummary: {
          subtotal,
          tax: 0, // No taxes or charges
          total,
        },
        specialInstructions: formData.specialInstructions,
        paymentStatus: 'pending',
        paymentMethod: paymentMethod,
      };

      // Handle based on payment method
      if (paymentMethod === 'cop') {
        await handleCashOnPickup(orderData);
      } else {
        // Initialize Razorpay payment
        const paymentInitiated = await handleRazorpayPayment(orderData);
        
        if (!paymentInitiated) {
          setLoading(false);
        }
      }

    } catch (error) {
      console.error('Error processing order:', error);
      showToast('Error processing order. Please try again.', 'error');
      setLoading(false);
    }
  };

  // Return null if cart is empty (navigation handled in useEffect)
  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8" style={{ fontFamily: "'Pacifico', cursive" }}>
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Delivery Information</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-amber-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-amber-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-amber-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-amber-900 mb-2">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  />
                </div>

                <div>
                  <label htmlFor="specialInstructions" className="block text-sm font-semibold text-amber-900 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    rows={4}
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    placeholder="Any special requests or delivery instructions..."
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-orange-50"
                    style={{ 
                      borderColor: paymentMethod === 'razorpay' ? '#F97316' : '#FED7AA',
                      backgroundColor: paymentMethod === 'razorpay' ? '#FFF7ED' : 'transparent'
                    }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'razorpay' | 'cop')}
                      className="w-5 h-5 text-rose-400 border-orange-200 focus:ring-rose-300"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-amber-900">Pay Online (Razorpay)</span>
                      </div>
                      <p className="text-sm text-amber-600 mt-1">
                        Secure payment via credit/debit card, UPI, or net banking
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-orange-50"
                    style={{ 
                      borderColor: paymentMethod === 'cop' ? '#F97316' : '#FED7AA',
                      backgroundColor: paymentMethod === 'cop' ? '#FFF7ED' : 'transparent'
                    }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cop"
                      checked={paymentMethod === 'cop'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'razorpay' | 'cop')}
                      className="w-5 h-5 text-rose-400 border-orange-200 focus:ring-rose-300"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center space-x-2">
                        <Wallet className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-amber-900">Cash on Pickup (COP)</span>
                      </div>
                      <p className="text-sm text-amber-600 mt-1">
                        Pay with cash when you pick up your order
                      </p>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'razorpay' && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                    <div className="flex items-start space-x-3">
                      <Lock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Secure Payment</h4>
                        <p className="text-sm text-blue-700 mb-3">
                          Click "Place Order" to proceed with secure payment via Razorpay. You'll be redirected to the payment gateway.
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-blue-600">
                          <CreditCard className="w-4 h-4" />
                          <span>Secure payment processing powered by Razorpay</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cop' && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                    <div className="flex items-start space-x-3">
                      <Wallet className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">Cash on Pickup</h4>
                        <p className="text-sm text-green-700">
                          You will pay ₹{total.toFixed(2)} in cash when you pick up your order.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-gradient-to-r from-rose-400 to-orange-300 text-white py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing Order...</span>
                  </>
                ) : paymentMethod === 'cop' ? (
                  <>
                    <Wallet className="w-5 h-5" />
                    <span>Place Order (COP) - ₹{total.toFixed(2)}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Place Order & Pay - ₹{total.toFixed(2)}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-semibold text-amber-900">{item.name}</p>
                      <p className="text-amber-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-amber-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-orange-100 pt-4 space-y-3">
                <div className="flex justify-between text-amber-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-orange-100 pt-3">
                  <div className="flex justify-between text-amber-900">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
