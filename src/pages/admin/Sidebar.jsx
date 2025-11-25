import { Link } from "react-router-dom";

const Sidebar = () => (
    <aside className="w-64 h-screen bg-white border-r">
      <div className="p-6">
        <div className="text-xl font-bold mb-2">Admin</div>
        <nav className="space-y-2">
          <Link to="/admin/orders" className="block px-3 py-2 rounded hover:bg-gray-100">Orders</Link>
          <Link to="/admin/products" className="block px-3 py-2 rounded hover:bg-gray-100">Products</Link>
        </nav>
      </div>
    </aside>
);

export default Sidebar;