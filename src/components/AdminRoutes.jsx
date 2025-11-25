import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyUser } from "../services/apis";

const AdminRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await verifyUser();
        setRole(res.user.role)
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false)
      }
    };
    checkAuth()
  }, []);

  if (loading && isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    )
  }
  
  if (isAuth && role === "admin") {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default AdminRoute;