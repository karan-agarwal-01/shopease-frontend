import { useEffect, useState } from "react";
import { addToCart, fetchCategory, fetchProduct } from "../services/apis";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Shop = () => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("All");
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const pageSize = 12;

    useEffect(() => {
      if (location.state) {
        setSelectedCategoryId(location.state)
      }
    }, [location.state])
 
    useEffect(() => {
      const getData = async () => {
        try {
          const [productRes, categoryRes] = await Promise.all([fetchProduct(), fetchCategory()]);
          if (productRes) {
            setProducts(productRes.product); 
          }
          if (categoryRes) {
            setCategories(categoryRes)
          }
        } catch (error) {
          toast.error("Failed to load categories");
        } finally {
          setLoading(false)
        }
      };
      getData();
    }, [])

    useEffect(() => {
      setCurrentPage(1);
    }, [selectedCategoryId]);

    const filteredProduct = selectedCategoryId === "All" ? products : products.filter((p) => p.category._id === selectedCategoryId)

    const randomize = [...filteredProduct].sort(() => Math.random() - 0.5);
    const startIndex = ( currentPage - 1 ) * pageSize;
    const endIndex = startIndex +  pageSize;
    const paginatedProducts = randomize.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProduct.length / pageSize)

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
      <div className="px-6 md:px-16 py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-10"> All Products</h1>  
        <div className="grid md:grid-cols-4 gap-10">
          <aside className="md:col-span-1 bg-white p-6 rounded-xl shadow overflow-visible">
            <h2 className="font-bold text-lg mb-4">Filters</h2>
            <div className="mt-4">
              <label className="block mb-1">Category</label>
              <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)} className="w-full border rounded-lg p-2 relative z-50">
                <option>All</option>
                {
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))
                }
              </select>
            </div>
          </aside>  
          <main className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProducts.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition flex flex-col justify-between">
                <img onClick={() => navigate(`/product-details/${product._id}`)} src= {product.image} className="w-full h-64 rounded-xl object-cover" />
                <div className="mt-4 flex justify-between items-center w-full">
                  <h3 className="font-semibold text-gray-800 w-[75%]">{product.name}</h3>
                  <p className="text-gray-600">₹{product.price}</p>
                </div>
                <button onClick={() => handleAddtoCart(product._id)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-3 w-full cursor-pointer hover:bg-indigo-800">
                  Add to Cart
                </button>
              </div>
            ))}
          </main>
          <div className="col-span-full flex justify-center items-center mt-10 gap-4">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer hover:bg-indigo-800 hover:text-white">Previous</button>
            <span className="font-semibold text-gray-700"> Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer hover:bg-indigo-800 hover:text-white">Next</button>
          </div>
        </div>
      </div>
    );
}


export default Shop;