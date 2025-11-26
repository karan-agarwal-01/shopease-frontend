import React, { useEffect, useState } from 'react'
import ProductCard from './common/ProductCard'
import { fetchProduct } from '../services/apis';
import { toast } from 'react-hot-toast';

const Products = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetchProduct();
        if (res && res.product) {
          const shuffle = [...res.product].sort(() => Math.random() - 0.5);
          const random20 = shuffle.slice(0, 20);
          setProducts(random20); 
        }
      } catch (error) {
        toast.error("Failed to load categories");
      } finally {
        setLoading(false)
      }
    };

    getProducts();

  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <section className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Featured Products</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {products.map((item) => (
                <ProductCard key={item._id} item={item} />
            ))}
        </div>
    </section>
  )
}

export default Products