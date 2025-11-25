import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyUser } from "../services/apis";

const ProtectedRoute = ({ children, protect = true }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!protect) {
      setIsAuth(true);
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        await verifyUser();
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false)
      }
    };
    checkAuth()
  }, [protect]);

  if (!protect) {
    return children;
  }

  if (loading && isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    )
  }
  
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;