import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart, fetchSingleProduct } from "../services/apis";
import { toast } from "react-hot-toast";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetchSingleProduct(id);
        if (res) {
          setProduct(res.product);
        }
      } catch (error) {
        toast.error("Failed to load categories");
      } finally {
        setLoading(false)
      }
    };
    getProduct();
  }, [])

  const handleAddtoCart = async (productId) => {
    const res = await addToCart({ productId, quantity: 1 });
    if (res) {
      toast.success(res.message)
    } else {
      window.location.href = '/login'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 md:px-16 grid md:grid-cols-2 gap-16">
      <div>
        <img src= {product.image} className="w-96 h-10/11 rounded-xl mb-2 object-cover" />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-2xl mt-3 text-indigo-600">₹{product.price}</p>
        <p className="mt-6 text-gray-700">{product.description}</p>
        <button onClick={() => handleAddtoCart(product._id)} className="bg-indigo-600 text-white px-6 py-3 rounded-lg mt-6 cursor-pointer hover:bg-indigo-800">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetails;