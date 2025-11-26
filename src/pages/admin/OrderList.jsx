import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOrder, getOrders, updateOrderStatus } from "../../services/apis";
import PageTitle from "./PageTitle";
import Badge from "./Badge";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      let mounted = true;
      const load = async () => {
        try {
          const data = await getOrders();
          if (mounted) setOrders(data || []);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      load();
      return () => (mounted = false);
    }, []);
  
    const handleStatus = async (id, status) => {
      await updateOrderStatus(id, { status });
      setOrders((s) => s.map(o => o._id === id ? { ...o, status } : o));
    };
  
    const handleDelete = async (id) => {
      const res = await deleteOrder(id);
      if (res) {
        toast.success(res.message)
      }
      setOrders((s) => s.filter(o => o._id !== id));
    };
  
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      )
    }
  
    return (
      <div className="-mt-16">
        <PageTitle>Your Orders</PageTitle>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 lg:justify-normal md:justify-normal justify-between">
                  <div className="flex gap-1 items-center">
                    <div className="text-lg text-gray-600">ID:</div>
                    <div className="font-medium break-all lg:text-lg md:text-lg text-xs">{order._id}</div>
                  </div>
                  <div className="ml-2">
                    <Badge color={order.status === 'Confirmed' ? 'green' : order.status === 'Pending' ? 'yellow' : order.status === 'Cancelled' ? 'red' : 'gray'}>{order.status}</Badge>
                  </div>
                </div>
                <div className="mt-2 text-gray-700">Total: ₹ {order.totalAmount ?? 0}</div>
                <div className="mt-1 text-sm text-gray-500">Ordered on: {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</div>
              </div>
  
              <div className="mt-4 md:mt-0 flex items-center gap-3">
                <button onClick={() => navigate(`/admin/orders/${order._id}`)} className="px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 cursor-pointer flex items-center gap-1 text-sm"><FaEye size={18} /> View</button>
                <button onClick={() => handleDelete(order._id)} className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer flex items-center gap-1 text-sm"><MdDelete size={18} /> Delete</button>
                <select defaultValue={order.status} onChange={(e) => handleStatus(order._id, e.target.value)} className="border rounded px-2 py-1 cursor-pointer    ">
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default OrdersList;