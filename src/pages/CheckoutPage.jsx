import { useState } from "react";
import { createPayment, getUserOrder } from "../services/apis";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useParams } from "react-router-dom";

const Checkout = () => {

  const [order, setOrder] = useState([])
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      const res = await getUserOrder()
      if (res && Array.isArray(res)) {
        const matchedOrder = res.find((o) => o._id === id);
        setOrder(matchedOrder)
        setLoading(false)
      }
    };
    loadData();
  }, []);

  const handlePayment = async () => {
    setIsPaying(true);
    const res = await createPayment({ orderId: order._id })
    if (res?.url) {
      window.location.href = res.url
    } else {
      setIsPaying(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 md:px-16">
      <h1 className="text-3xl font-bold mb-10">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-xl mb-4">Shipping Address</h2>
            <h1 className="mb-4">{order.user?.fullname}</h1>
            <h1 className="mb-4">{order.user?.phone}</h1>
            <h1 className="mb-4">{order.user?.address}</h1>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-xl mb-4">Order Summary</h2>
          {
            order.orderItems?.map((item, index) => (
              <div key={index} className="flex justify-between w-full mb-2">
                <div className="w-[80%]">{item.product.name}</div>
                <div className="flex items-center gap-3">
                  <div>{item.quantity}</div>
                  <FiX />
                  <div>{item.product.price}</div>
                </div>
              </div>
            ))
          }
          <hr className="my-4" />
          <p>Total: ₹{order.totalAmount}</p>
          <button onClick={handlePayment} disabled={isPaying} className={`w-full mt-6 py-3 rounded-lg text-white ${isPaying ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-800 cursor-pointer"}`}>Pay Now</button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;