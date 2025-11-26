import { useNavigate } from "react-router-dom";

const Layout = ({ title, onSubmit, navigateRoute, navigateTitle, disabled, buttonText, style, children  }) => {

    const navigate = useNavigate();

    return (
        <div style={style} className="min-h-screen flex items-center justify-center bg-[#f3f4f6] p-2">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">{title}</h2>
                <form onSubmit={onSubmit}>
                    { children }
                    <button type="submit" className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-70" disabled={disabled}>{buttonText}</button>
                </form>
                {(navigateRoute === "login" || navigateRoute === "register") && (
                    <p className="mt-4 text-sm text-center text-gray-600">
                        {navigateRoute === "register"
                        ? "Didn't have an account ? "
                        : "Already have an account ? "}
                        <span
                        onClick={() => navigate(`/${navigateRoute}`)}
                        className="text-indigo-600 cursor-pointer font-medium"
                        >
                        {navigateTitle}
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
}

export default Layout;