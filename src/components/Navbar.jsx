import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaCaretRight } from "react-icons/fa";

import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();

    const { token, logout } = useAuth();

    /**
     * Handle Logout
     */
    const handleLogout = async () => {
        await logout();

        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-black/10 shadow-sm">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-5">
                <div className="flex items-center justify-between gap-3 sm:gap-4">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-lg sm:text-2xl md:text-3xl font-retro font-bold text-black hover:text-gray-700 transition-colors flex-shrink-0"
                    >
                        <span className="hidden sm:inline">▶ HN_Scraper</span>
                        <span className="sm:hidden">▶ HN</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
                        {!token ? (
                            <>
                                <Link
                                    to="/login"
                                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-black hover:bg-gray-100 rounded-md transition-all duration-200"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="btn-retro px-3 sm:px-4 py-2 text-xs sm:text-sm bg-black text-white font-medium rounded-lg hover:opacity-90 transition-all"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/"
                                    className="hidden sm:block px-3 sm:px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 rounded-md transition-all duration-200"
                                >
                                    Home
                                </Link>

                                <Link
                                    to="/bookmarks"
                                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-black hover:bg-gray-100 rounded-md transition-all duration-200 flex items-center gap-1"
                                >
                                    <FaStar className="text-sm" />
                                    <span className="hidden sm:inline">Bookmarks</span>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="btn-retro px-3 sm:px-4 py-2 text-xs sm:text-sm bg-red-500 text-white font-medium rounded-lg hover:opacity-90 transition-all"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;