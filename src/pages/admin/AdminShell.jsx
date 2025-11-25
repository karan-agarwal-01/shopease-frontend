import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AdminShell = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
      </div>
      <div className="flex pt-16">
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow z-40 overflow-y-auto overflow-x-hidden hidden md:block">
          <Sidebar />
        </div>
        <div className={`fixed top-0 left-0 h-full w-68 bg-white shadow-lg z-50 p-2 transform transition-transform duration-300 md:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <button onClick={() => setMobileOpen(false)} className="text-gray-500 mb-4 text-lg font-bold">
            ✕ Close
          </button>
          <Sidebar />
        </div>
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          />
        )}
        <main className="flex-1 lg:ml-64 p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminShell;
