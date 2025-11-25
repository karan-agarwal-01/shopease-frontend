import { HiMenu } from "react-icons/hi";
import { logout } from "../../services/apis";
import { toast } from "react-hot-toast";

const Topbar = ({ onMenuClick }) => {

    const handleLogout = async () => {
        const res = await logout();
        if (res) {
            toast.success(res.message)
            window.location.href = "/login";
        }
    };

    return (
        <header className="bg-white border-b p-4 flex items-center justify-between">
            <button className="md:hidden text-2xl text-gray-700" onClick={onMenuClick}>
                <HiMenu />
            </button>
            <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">ShopEase Admin</div>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={handleLogout} className="px-3 py-1 rounded bg-red-600 text-white cursor-pointer hover:bg-red-800">Logout</button>
            </div>
        </header>
    );
}

export default Topbar;