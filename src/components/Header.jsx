import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { verifyUser } from "../services/apis";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRole = async () => {
            try {
                const res = await verifyUser();
                if (res && res.user) {
                    setRole(res.user.role);
                } else {
                    setRole(null);
                }
            } catch (error) {
                setRole(null);
            } finally {
                setLoading(false);
            }
        };
    
        getRole();
    }, []);

    if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        )
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-100">
            <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
                <Link to="/" className="text-2xl font-bold text-indigo-600">ShopEase</Link>
                <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
                    <Link to="/" className="hover:text-indigo-600">Home</Link>
                    <Link to="/shop" className="hover:text-indigo-600">Shop</Link>
                    <Link to="/categories" className="hover:text-indigo-600">Categories</Link>
                    <Link to="/about" className="hover:text-indigo-600">About</Link>
                </nav>
                <div className="flex items-center gap-6 text-gray-700">
                    <div>
                        <Link to="/cart" className="hover:text-indigo-600 text-xl">
                            <FaShoppingCart />
                        </Link>
                    </div>
                    <div>
                        <Link to="/orders" className="hover:text-indigo-600 text-xl">
                            <BsFillBagCheckFill />
                        </Link>
                    </div>
                    <div>
                        <Link to={role === 'admin' ? "/admin" : role ? "/profile" : "/login"} className="hover:text-indigo-600 text-xl flex items-center gap-2">
                            <FaUser />
                            <div className="text-md capitalize">{ role || "Login" }</div>
                        </Link>
                    </div>
                    <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                </div>
            </div>
            {menuOpen && (
                <nav className="md:hidden bg-white shadow-md p-4 flex flex-col gap-4">
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
                    <Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
                    <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                </nav>
            )}
        </header>
    );
}

export default Header;