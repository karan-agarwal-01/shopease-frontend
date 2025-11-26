import { useEffect } from "react";
import { useState } from "react";
import { clearCart, createOrder, getCart, getProfile, removeCart, updateCartQuantity } from "../services/apis";
import { FiX } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEdit, MdOutlineEmojiEmotions } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const [cartData, setCartData] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const res = await getCart();
      if (res) {
        setCartData(res.items)
        setTotalPrice(res.totalPrice)
      }
    } catch (error) {
      setCartData([]);
    }
  }

  const handleRemove = async (productId) => {
    const res = await removeCart({ productId });
    if (res) {
      toast.success(res.message)
      getData();
    }
  }

  const handleUpdateQty = async (productId, quantity) => {
    const res = await updateCartQuantity({ productId, quantity });
    if (res) {
      toast.success(res.message);
      getData();
    }
  };

  const DeleteAllCart = async () => {
    const res = await clearCart()
    if (res) {
      toast.success(res.message);
      getData();
    }
  }

  const HandleCreateOrder = async () => {
    const res = await createOrder({
      shippingAddress: profile.address, phone: profile.phone
    });
    if (res) {
      const id = res.order._id
      toast.success(res.message)
      if (id) {
        navigate(`/checkout/${id}`)
      }
    }
  }

  useEffect(() => {
    const loadAll = async () => {
      try {
        const res = await getProfile()
        if (res && res.user) {
          setProfile(res.user)
        } else {
          setProfile(null);
        }
      } catch (error) {
        setProfile(null);
      }

      await getData();
      setLoading(false)
    };

    loadAll();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
    {
      cartData.length === 0 ? (
        <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 p-2">
          <div className="p-8 rounded-3xl text-center shadow-2xl w-[90%] max-w-md bg-white text-gray-700">
            <MdOutlineEmojiEmotions className="text-6xl text-red-700 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Cart is empty</h2>
            <p onClick={() => navigate('/shop')} className="text-md text-indigo-600 cursor-pointer hover:text-indigo-800 opacity-90 mb-6">
              Explore shop here
            </p>
          </div>
        </div>
      ) : (
      <div className="max-w-5xl mx-auto py-16 px-6 md:px-16">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <button onClick={DeleteAllCart} className="text-md mr-1 text-gray-500 cursor-pointer hover:text-gray-700">Clear cart</button>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            {cartData.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-xl shadow w-full">
                <div className="flex items-center w-[85%]">
                  <img src={item.product.image} className="w-24 h-24 rounded-xl object-cover" />
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold">{item.product.name}</h3>
                    <div className="flex items-center gap-2 my-4">
                      <div>₹{item.product.price}</div>
                      <FiX />
                      <div className="flex items-center gap-2">
                        <input type='text' min={1} value={item.newQty ?? item.quantity} onChange={(e) => {
                          const updated = cartData.map((c) => c._id === item._id ? { ...c, newQty: Number(e.target.value) } : c)
                          setCartData(updated)
                        }} className="w-11 h-8 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder={item.quantity} />
                        <button disabled={!item.newQty || item.newQty === item.quantity || item.newQty < 1} className={`p-1 rounded text-white ${item.newQty && item.newQty !== item.quantity && item.newQty > 0 ? "bg-indigo-600 hover:bg-indigo-800 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`} onClick={() => handleUpdateQty(item.product._id, item.newQty)}>
                          <MdOutlineModeEdit size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => handleRemove(item.product._id)} className="text-red-500 font-bold text-lg cursor-pointer hover:text-red-700">
                  <FaRegTrashAlt />
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-xl shadow h-50">
            <h2 className="font-bold text-xl mb-4">Summary</h2>
            <p className="text-gray-600 text-lg">Subtotal: ₹{totalPrice}</p>
            <button onClick={HandleCreateOrder} className="bg-green-600 text-white w-full py-3 rounded-lg mt-4 cursor-pointer hover:bg-green-800">
              Checkout
            </button>
          </div>
        </div>
      </div>
      )
    }

    </>
  );
}

export default Cart;