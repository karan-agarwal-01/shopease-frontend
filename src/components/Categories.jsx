import { useEffect, useState } from "react";
import CategoryCard from "./common/CategoryCard";
import { fetchCategory } from "../services/apis";
import { toast } from "react-hot-toast";

const Categories = () => {

    
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)

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
          setLoading(false)
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
        <section className="py-16 px-6 md:px-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Shop by Category</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {categories.map((item) => (
                    <CategoryCard key={item._id} item={item} />
                ))}
            </div>
        </section>
    );
}

export default Categories;