import { useState, useEffect } from "react";
import { createPayment, getUserOrder, cancelOrder } from "../services/apis";
import { FiX } from "react-icons/fi";
import { useParams } from "react-router-dom";
import TrackOrderPage from "./TrackOrderPage";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const { id } = useParams();

  const loadOrder = async () => {
    const res = await getUserOrder();
    if (res && Array.isArray(res)) {
      const matchedOrder = res.find((o) => o._id === id);
      setOrder(matchedOrder);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  const handlePayment = async () => {
    setIsPaying(true);
    const res = await createPayment({ orderId: order._id });
    if (res?.url) window.location.href = res.url;
    else setIsPaying(false);
  };

  const handleCancelOrder = async () => {
    setIsCancelling(true);
    const res = await cancelOrder(order._id);
    if (res) {
      toast.success(res?.message);
      await loadOrder();
      setIsCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (order.status !== "Pending") {
    return (
      <TrackOrderPage order={order} onCancel={handleCancelOrder} isCancelling={isCancelling} />
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 md:px-16">
      <h1 className="text-3xl font-bold mb-10">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-xl mb-4">Shipping Address</h2>
          <p>{order.user?.fullname}</p>
          <p>{order.user?.phone}</p>
          <p>{order.user?.address}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-xl mb-4">Order Summary</h2>
          {order.orderItems?.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <div>{item.product.name}</div>
              <div className="flex items-center gap-3">
                <span>{item.quantity}</span>
                <FiX />
                <span>{item.product.price}</span>
              </div>
            </div>
          ))}
          <hr className="my-4" />
          <p className="font-bold text-lg">Total: ₹{order.totalAmount}</p>
          <div className="flex lg:flex-row md:flex-row flex-col gap-2">
            <button onClick={handlePayment} disabled={isPaying} className={`w-full mt-6 py-3 rounded-lg text-white ${ isPaying ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-800 cursor-pointer"}`}>
              Pay Now
            </button>
            <button onClick={handleCancelOrder} disabled={isCancelling} className={`w-full mt-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 ${ isCancelling ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}>
              {isCancelling ? "Cancelling..." : "Cancel Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
