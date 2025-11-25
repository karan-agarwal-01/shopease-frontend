import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getProfile, logout } from "../services/apis";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            const res = await getProfile()
            setProfile(res.user)
            setLoading(false)
        };
        loadProfile();
    }, []);

    const handleLogout = async () => {
        const res = await logout();
        if (res) {
            toast.success(res.message)
            window.location.href = "/login";
        }
    };

    if (loading) {
        return (
            <div className="min-h-[90vh] flex items-center justify-center bg-gray-400">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!profile?.fullname) {
        return (
            <div className="min-h-[90vh] flex items-center justify-center bg-gray-400">
                <div className="bg-white p-6 shadow-xl rounded-xl text-center max-w-sm w-full">
                    <h1 className="text-xl font-semibold text-gray-800">Profile not created</h1>
                    <a href="/create-profile" className="text-blue-600 mt-3 inline-block font-medium">Create your profile</a>
                    <div className="flex gap-4 justify-center mt-4">
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 cursor-pointer">Logout</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[90vh] bg-gray-400 flex items-center justify-center p-6">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center relative">
                <h1 className="text-2xl font-bold mt-6 text-gray-900">{profile.fullname}</h1>
                <h1 className="text-gray-600 mt-2 px-4">{profile.email}</h1>
                <h1 className="text-gray-600 mt-2 px-4">{profile.phone}</h1>
                <h1 className="text-gray-600 mt-2 px-4">{profile.address}</h1>
                <div className="my-6 border-b"></div>
                <div className="flex gap-4 justify-center">
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 cursor-pointer">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
