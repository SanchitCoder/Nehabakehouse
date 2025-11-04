import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Award, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { localProducts } from '../lib/productsData';
import type { Product } from '../lib/types';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Use local products data - get featured products
    const featured = localProducts.filter(product => product.featured).slice(0, 6);
    setFeaturedProducts(featured);
  }, []);

  return (
    <div>
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/truffles.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1
            className="text-6xl md:text-7xl font-bold text-amber-900 mb-6"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Neha's Bakehouse
          </h1>
          <p className="text-2xl md:text-3xl text-amber-800 mb-4 font-light">
            Baked with Love, Served with Joy
          </p>
          <p className="text-lg text-amber-700 mb-8 max-w-2xl mx-auto">
            Discover artisan baked goods crafted daily with the finest ingredients. Every creation is a celebration of flavor and tradition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-rose-400 to-orange-300 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/custom-order"
              className="inline-flex items-center justify-center space-x-2 bg-white text-amber-900 px-8 py-4 rounded-full font-semibold text-lg border-2 border-amber-900 hover:bg-amber-50 transition-all"
            >
              <span>Custom Order</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Made with Love</h3>
              <p className="text-amber-700">
                Every item is handcrafted with passion and care, using traditional recipes passed down through generations.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Premium Quality</h3>
              <p className="text-amber-700">
                We use only the finest ingredients to ensure every bite is a memorable experience of taste and texture.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Fresh Daily</h3>
              <p className="text-amber-700">
                Baked fresh every morning to ensure you get the best quality and taste in every single order.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>
              Featured Treats
            </h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Discover our most loved creations, each made with the finest ingredients and lots of heart.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-400 to-orange-300 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Pacifico', cursive" }}>
            About Neha's Bakehouse
          </h2>
          <p className="text-lg text-orange-100 mb-6 leading-relaxed">
            Welcome to Neha's Bakehouse, where every creation tells a story of passion, tradition, and love for the art of baking.
            For over a decade, we've been serving our community with fresh, handcrafted baked goods that bring joy to every occasion.
          </p>
          <p className="text-lg text-orange-100 leading-relaxed">
            From our signature cakes to our daily fresh bread, each item is made with the finest ingredients and traditional techniques.
            We believe that great baking starts with quality ingredients and ends with a smile on your face.
          </p>
        </div>
      </section>
    </div>
  );
}
