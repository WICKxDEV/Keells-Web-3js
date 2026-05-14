import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Plus, Edit2, Trash2, Package, ShoppingBag, Check, Save } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import { Product } from '../../types';
import { useTranslation } from 'react-i18next';

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    const data = await getProducts();
    if (data) setProducts(data);
    setIsLoading(false);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (editingProduct.id) {
      await updateProduct(editingProduct.id, editingProduct);
    } else {
      await createProduct(editingProduct as Omit<Product, 'id'>);
    }
    setEditingProduct(null);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this product?')) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-white overflow-y-auto">
      <div className="container mx-auto py-12 px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Admin Console</h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Enterprise Management Systems</p>
          </div>
          <button 
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all border border-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-gray-50 rounded-[40px] p-8 border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                  <Package className="text-primary" />
                  Inventory Management
                </h2>
                <button 
                  onClick={() => setEditingProduct({
                    name: '',
                    nameSi: '',
                    price: 0,
                    category: 'Fruits',
                    unit: 'kg',
                    stock: 0,
                    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80',
                    isFresh: true,
                    rating: 5
                  })}
                  className="px-6 py-3 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <Plus size={16} />
                  Add New Product
                </button>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  <div className="py-20 text-center font-black text-gray-300 animate-pulse text-sm">UPDATING DATABASES...</div>
                ) : (
                  products.map(product => (
                    <div key={product.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-primary transition-all">
                      <div className="flex items-center gap-6">
                        <img src={product.image} className="w-16 h-16 rounded-2xl object-cover border border-gray-50" />
                        <div>
                          <h3 className="font-black uppercase tracking-tight text-sm">{product.name}</h3>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category} • Rs. {product.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingProduct(product)}
                          className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Editor Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            {editingProduct ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-12 bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl"
              >
                <h3 className="text-xl font-black uppercase tracking-tight mb-8">
                  {editingProduct.id ? 'Edit Product' : 'Create Product'}
                </h3>
                <form onSubmit={handleSaveProduct} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest block mb-1">Product Name (EN)</label>
                      <input 
                        type="text" 
                        value={editingProduct.name}
                        onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                        className="w-full px-5 py-3 bg-gray-50 rounded-xl border-none font-bold text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest block mb-1">Product Name (SI)</label>
                      <input 
                        type="text" 
                        value={editingProduct.nameSi}
                        onChange={e => setEditingProduct({...editingProduct, nameSi: e.target.value})}
                        className="w-full px-5 py-3 bg-gray-50 rounded-xl border-none font-bold text-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest block mb-1">Price (Rs.)</label>
                        <input 
                          type="number" 
                          value={editingProduct.price}
                          onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                          className="w-full px-5 py-3 bg-gray-50 rounded-xl border-none font-bold text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest block mb-1">Stock</label>
                        <input 
                          type="number" 
                          value={editingProduct.stock}
                          onChange={e => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}
                          className="w-full px-5 py-3 bg-gray-50 rounded-xl border-none font-bold text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest block mb-1">Category</label>
                      <select 
                        value={editingProduct.category}
                        onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                        className="w-full px-5 py-3 bg-gray-50 rounded-xl border-none font-bold text-sm"
                      >
                        <option>Fruits</option>
                        <option>Vegetables</option>
                        <option>Bakery</option>
                        <option>Dairy</option>
                        <option>Frozen Foods</option>
                        <option>Household</option>
                        <option>Pharmacy</option>
                        <option>Snacks</option>
                        <option>Electronics</option>
                        <option>Personal Care</option>
                        <option>Baby Care</option>
                        <option>Sri Lankan Local Products</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="submit"
                      className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button 
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <div className="bg-gray-50/50 border border-gray-100 rounded-[40px] p-10 h-full flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-xl">
                    <Package className="text-gray-200" size={32} />
                 </div>
                 <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">Select a product to edit</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
