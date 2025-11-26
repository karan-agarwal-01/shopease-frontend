import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserOrder } from "../services/apis";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getUserOrder();
        if (Array.isArray(res)) {
          setOrders(res);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.log(error);
        setOrders([])
      } finally {
        setLoading(false)
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">Your Orders</h1>
        {orders.length === 0 && (
          <p className="text-center text-gray-600">No orders found.</p>
        )}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition-all">
              <div className="flex lg:flex-row md:flex-row flex-col justify-between lg:items-center md:items-center gap-2">
                <h2 className="font-semibold text-gray-800">
                  Order ID: <span className="text-blue-600 break-all">{order._id}</span>
                </h2>
                <span className={`px-4 py-1 w-22 text-sm font-semibold rounded-md ${ order.status === "Confirmed" ? "bg-green-100 text-green-700" : order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : order.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>{order.status}</span>
              </div>
              <div className="mt-4 flex flex-wrap justify-between items-center text-gray-700">
                <p className="text-lg font-semibold">
                  Total: <span className="text-black">₹ {order.totalAmount}</span>
                </p>
                <p className="text-sm">
                  Ordered on:{" "}
                  <span className="text-gray-900 font-medium">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </p>
              </div>

              {/* View Details Link */}
              <div className="mt-5">
                <Link
                  to={`/checkout/${order._id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  View Order Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
