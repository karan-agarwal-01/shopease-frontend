import { useEffect, useState } from "react";
import { deleteProduct, fetchProduct } from "../../services/apis";
import PageTitle from "./PageTitle";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProduct();
        setProducts(data.product || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete product?")) return;
    await deleteProduct(id);
    setProducts((p) => p.filter((x) => x._id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="px-2 md:px-6 -mt-16">
      <div className="flex lg:flex-row md:flex-row flex-col lg:justify-between md:justify-between justify-normal">
        <PageTitle>Products</PageTitle>
        <div className="flex justify-end gap-2 mb-6">
            <button onClick={() => navigate("/admin/product-form")} className="bg-indigo-600 hover:bg-indigo-800 text-white px-5 py-2 rounded-lg shadow transition cursor-pointer">
            + Add Product
            </button>
            <button onClick={() => navigate("/admin/category-form")} className="bg-indigo-600 hover:bg-indigo-800 text-white px-5 py-2 rounded-lg shadow transition cursor-pointer">
            + Add Category
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between items-center border hover:shadow-lg transition">
            <img src={p.image} alt={p.name} className="w-32 h-32 object-cover rounded-md mb-3"/>
            <div className="font-semibold text-center text-lg">{p.name}</div>
            <div className="text-sm text-center text-gray-600 mt-1">₹ {p.price} • Stock: {p.stock}</div>
            <div className="text-sm text-center text-gray-600 mt-1">{p.category.name}</div>
            <div className="mt-4">
              <button onClick={() => handleDelete(p._id)} className="bg-red-600 hover:bg-red-800 cursor-pointer text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
                <MdDelete size={18} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
