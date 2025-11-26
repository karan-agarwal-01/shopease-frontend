import { useEffect, useState } from "react";
import { getOrders } from "../../services/apis";
import Badge from "./Badge";
import PageTitle from "./PageTitle";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const load = async () => {
        try {
          const orders = await getOrders();
          const found = orders.find(o => o._id === id);
          setOrder(found || null);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      load();
    }, [id]);
  
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      )
    }
    
    if (!order) return <div>Order not found</div>;
  
    return (
      <div className="-mt-16">
        <PageTitle>Order Details</PageTitle>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4 flex justify-between gap-2">
            <div>
              <div className="text-sm text-gray-600">Order ID</div>
              <div className="font-medium break-all text-sm">{order._id}</div>
            </div>
            <div className="flex md:flex-row flex-col items-center md:gap-2 gap-0.5">
              <div className="text-sm text-gray-600">Status</div>
              <Badge color={order.status === 'Confirmed' ? 'green' : order.status === 'Pending' ? 'yellow' : order.status === 'Cancelled' ? 'red' : 'gray'}>{order.status}</Badge>
            </div>
          </div>
  
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Shipping</h3>
              <p>{order.user.fullname}</p>
              <p>{order.shippingAddress}</p>
              <p className="mt-2">Phone: {order.phone}</p>
              <p className="mt-2 text-sm text-gray-500">Ordered on: {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</p>
            </div>
  
            <div>
              <h3 className="font-semibold mb-2">Items</h3>
              <div className="space-y-3">
                {order.orderItems?.map((it, i) => (
                  <div key={i} className="flex items-center gap-3 border-b pb-2">
                    <img src={it.product?.image || it.productImage} alt={it.product?.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-medium">{it.product?.name}</div>
                      <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
                    </div>
                    <div className="font-semibold">₹ {it.product?.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
        </div>
      </div>
    );
  };

export default OrderDetails;