import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const HomeLayout = () => {

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default HomeLayout;