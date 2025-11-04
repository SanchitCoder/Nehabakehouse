import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ADMIN_PASSWORD } from '../lib/config';
import type { Product } from '../lib/types';
import Toast, { useToast } from '../components/Toast';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Cakes' as Product['category'],
    image_url: '',
    featured: false,
  });

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('admin-auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin-auth', 'true');
      showToast('Login successful', 'success');
    } else {
      showToast('Invalid password', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin-auth');
    showToast('Logged out successfully', 'info');
  };

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast('Error loading products', 'error');
    }
  }

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        image_url: product.image_url,
        featured: product.featured,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Cakes',
        image_url: '',
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: formData.image_url,
        featured: formData.featured,
        updated_at: new Date().toISOString(),
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        showToast('Product updated successfully', 'success');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        showToast('Product added successfully', 'success');
      }

      closeModal();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      showToast('Error saving product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showToast('Product deleted successfully', 'success');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      showToast('Error deleting product', 'error');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-orange-50 to-rose-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-8">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300 mb-6"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-400 to-orange-300 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Login
            </button>
          </form>
        </div>
        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900" style={{ fontFamily: "'Pacifico', cursive" }}>
            Admin Panel
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => openModal()}
              className="flex items-center space-x-2 bg-gradient-to-r from-rose-400 to-orange-300 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 border-2 border-amber-900 text-amber-900 rounded-full font-semibold hover:bg-amber-50 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-rose-100 to-orange-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-amber-900">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-amber-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-amber-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-amber-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-amber-900">Featured</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-amber-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-amber-900">{product.name}</div>
                      <div className="text-sm text-amber-600 line-clamp-1">{product.description}</div>
                    </td>
                    <td className="px-6 py-4 text-amber-700">{product.category}</td>
                    <td className="px-6 py-4 font-semibold text-amber-900">₹{product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {product.featured ? (
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal(product)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-2">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-2">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">Category</label>
                    <select
                      required
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as Product['category'] })}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                    >
                      <option value="Cakes">Cakes</option>
                      <option value="Pastries">Pastries</option>
                      <option value="Breads">Breads</option>
                      <option value="Cookies">Cookies</option>
                      <option value="Custom Orders">Custom Orders</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-2">Image URL</label>
                  <input
                    type="url"
                    required
                    value={formData.image_url}
                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 text-rose-400 border-orange-200 rounded focus:ring-rose-300"
                  />
                  <label htmlFor="featured" className="ml-3 text-sm font-semibold text-amber-900">
                    Featured Product
                  </label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-rose-400 to-orange-300 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
