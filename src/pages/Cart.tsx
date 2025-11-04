import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount, subtotal, total } = useCart();

  if (cartCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingBag className="w-24 h-24 mx-auto text-orange-200 mb-6" />
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Your cart is empty</h2>
          <p className="text-amber-700 mb-8">
            Looks like you haven't added any delicious treats yet. Let's fix that!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-400 to-orange-300 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8" style={{ fontFamily: "'Pacifico', cursive" }}>
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-orange-50 flex-shrink-0">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-amber-900">{item.name}</h3>
                      <p className="text-sm text-amber-600">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-sm text-amber-700 mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-orange-100 hover:bg-orange-200 rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4 text-amber-900" />
                      </button>
                      <span className="text-lg font-semibold text-amber-900 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-orange-100 hover:bg-orange-200 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4 text-amber-900" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-amber-600">
                        ₹{item.price.toFixed(2)} each
                      </p>
                      <p className="text-xl font-bold text-amber-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-amber-700">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-orange-100 pt-3">
                  <div className="flex justify-between text-amber-900">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-gradient-to-r from-rose-400 to-orange-300 text-white text-center py-4 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="block w-full text-center text-amber-700 hover:text-amber-900 mt-4 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
