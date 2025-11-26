import { FiX } from "react-icons/fi";

const TrackOrderPage = ({ order, onCancel, isCancelling }) => {
  const statusSteps = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
  ];

  const currentStep = statusSteps.indexOf(order.status);

  return (
    <div className="max-w-3xl mx-auto py-14 px-6 md:px-12">
      <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        {statusSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${ index <= currentStep ? "bg-indigo-600" : "bg-gray-300" }`}>
              {index + 1}
            </div>
            <p className={`mt-2 text-sm font-semibold ${index <= currentStep ? "text-indigo-600" : "text-gray-500"}`}>
              {step}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        {order.orderItems?.map((item, index) => (
          <div key={index} className="flex justify-between pb-2 mb-3">
            <span>{item.product.name}</span>
            <span className="flex items-center gap-2">
              {item.quantity} <FiX /> ₹{item.product.price}
            </span>
          </div>
        ))}

        <p className="font-bold text-lg mt-3">Total: ₹{order.totalAmount}</p>

        <div className="mt-6">
          <h2 className="font-bold text-xl mb-2">Shipping Address</h2>
          <p>{order.user?.fullname}</p>
          <p>{order.user?.phone}</p>
          <p>{order.user?.address}</p>
        </div>

        {["pending", "Confirmed"].includes(order.status) && (
          <button
            onClick={onCancel}
            disabled={isCancelling}
            className={`w-full mt-6 py-3 rounded-lg text-white bg-red-600 hover:bg-red-700 
              ${isCancelling ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isCancelling ? "Cancelling..." : "Cancel Order"}
          </button>
        )}

        {order.status === "Cancelled" && (
          <p className="text-red-600 font-semibold mt-6 text-center">Order has been cancelled.</p>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;