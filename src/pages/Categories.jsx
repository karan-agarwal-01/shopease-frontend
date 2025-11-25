import { useEffect, useState } from "react";
import { fetchCategory } from "../services/apis";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CategoriesPage = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const getCategories = async () => {
        try {
          const res = await fetchCategory();
          if (res) {
            setCategories(res); 
          }
        } catch (error) {
          toast.error("Failed to load categories");
        } finally {
          setLoading(false);
        }
      };

      getCategories();

    }, [])

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-400">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      )
    }

    return (
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">All Categories</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat._id} onClick={() => navigate('/shop', { state: cat._id})} className="p-6 bg-gray-100 rounded-xl text-center shadow hover:shadow-xl cursor-pointer">
              <img src={cat.image} className="w-64 h-64 rounded-xl mb-2 object-cover" />
              <h2 className="font-bold text-lg">{cat.name}</h2>
            </div>
          ))}
        </div>
      </div>
    );
}

export default CategoriesPage;