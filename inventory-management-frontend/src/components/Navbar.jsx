import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <nav className="bg-blue-700 text-white px-8 py-4 flex justify-between items-center shadow">
            <h1 className="text-2xl font-bold">
                Inventory Management System
            </h1>
            <button
                onClick={handleLogout}
                className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;