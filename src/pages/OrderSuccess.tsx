import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Home, Package, CreditCard, Wallet } from 'lucide-react';
import type { OrderData } from '../lib/types';

export default function OrderSuccess() {
  const location = useLocation();
  const { orderId, orderData, webhookSent } = location.state as {
    orderId: string;
    orderData: OrderData;
    webhookSent: boolean;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-amber-900 mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>
            Order Placed Successfully!
          </h1>

          <p className="text-lg text-amber-700 mb-8">
            Thank you for your order! We've received your purchase and will begin preparing your delicious treats right away.
          </p>

          <div className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Package className="w-6 h-6 text-amber-900" />
              <h2 className="text-xl font-bold text-amber-900">Order Details</h2>
            </div>

            <div className="space-y-3 text-left">
              <div className="flex justify-between border-b border-orange-200 pb-2">
                <span className="text-amber-700 font-medium">Order ID:</span>
                <span className="text-amber-900 font-bold">{orderId}</span>
              </div>

              <div className="flex justify-between border-b border-orange-200 pb-2">
                <span className="text-amber-700 font-medium">Customer:</span>
                <span className="text-amber-900 font-semibold">{orderData.customer.name}</span>
              </div>

              <div className="flex justify-between border-b border-orange-200 pb-2">
                <span className="text-amber-700 font-medium">Email:</span>
                <span className="text-amber-900 font-semibold">{orderData.customer.email}</span>
              </div>

              <div className="flex justify-between border-b border-orange-200 pb-2">
                <span className="text-amber-700 font-medium">Phone:</span>
                <span className="text-amber-900 font-semibold">{orderData.customer.phone}</span>
              </div>

              <div className="flex justify-between border-b border-orange-200 pb-2">
                <span className="text-amber-700 font-medium">Delivery Address:</span>
                <span className="text-amber-900 font-semibold text-right">{orderData.customer.address}</span>
              </div>

              <div className="flex justify-between border-b border-orange-200 pb-2">
                <span className="text-amber-700 font-medium">Payment Method:</span>
                <span className="text-amber-900 font-semibold flex items-center space-x-2">
                  {orderData.paymentMethod === 'cop' ? (
                    <>
                      <Wallet className="w-4 h-4 text-green-600" />
                      <span>Cash on Pickup</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>Razorpay (Paid)</span>
                    </>
                  )}
                </span>
              </div>

              <div className="flex justify-between border-b border-orange-200 pb-2">
                <span className="text-amber-700 font-medium">Payment Status:</span>
                <span className={`font-semibold ${
                  orderData.paymentStatus === 'completed' 
                    ? 'text-green-600' 
                    : orderData.paymentStatus === 'pending'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}>
                  {orderData.paymentStatus === 'completed' 
                    ? 'Completed' 
                    : orderData.paymentStatus === 'pending'
                    ? 'Pending'
                    : 'Failed'}
                </span>
              </div>

              {orderData.specialInstructions && (
                <div className="flex justify-between border-b border-orange-200 pb-2">
                  <span className="text-amber-700 font-medium">Special Instructions:</span>
                  <span className="text-amber-900 font-semibold text-right">{orderData.specialInstructions}</span>
                </div>
              )}

              <div className="pt-4 border-t-2 border-orange-200">
                <h3 className="font-bold text-amber-900 mb-3">Items:</h3>
                <div className="space-y-2">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-amber-700">
                        {item.quantity}x {item.productName}
                      </span>
                      <span className="text-amber-900 font-semibold">
                        ₹{item.subtotal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-amber-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{orderData.orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-900 text-lg font-bold border-t-2 border-orange-200 pt-2">
                  <span>Total:</span>
                  <span>₹{orderData.orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {webhookSent ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-8">
              <p className="text-green-800 font-medium">
                ✓ Order notification sent successfully
              </p>
            </div>
          ) : (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-8">
              <p className="text-yellow-800 font-medium">
                ⚠ Order notification could not be sent. Please check webhook configuration.
              </p>
            </div>
          )}


          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-rose-400 to-orange-300 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center space-x-2 bg-white text-amber-900 px-8 py-4 rounded-full font-semibold border-2 border-amber-900 hover:bg-amber-50 transition-all"
            >
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
