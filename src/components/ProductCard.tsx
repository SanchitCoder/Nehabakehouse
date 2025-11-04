import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../lib/types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-orange-50">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 text-xs font-medium rounded-full">
            {product.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-amber-900 mb-2">{product.name}</h3>
        <p className="text-sm text-amber-700 mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-900">
            ₹{product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
              isAdding
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-rose-400 to-orange-300 text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">{isAdding ? 'Added!' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
