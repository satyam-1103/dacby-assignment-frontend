import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const navigate = useNavigate();

    const { login, loading } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    /**
     * Handle Input Change
     */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    /**
     * Handle Login
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await login(formData);

        if (response.success) {
            toast.success("Login successful");

            navigate("/");
        } else {
            toast.error(response.message);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {/* Form Card */}
                <div className="card-shadow-retro bg-white border-2 border-black/30 p-8 rounded-xl">
                    {/* Header */}
                    <div className="mb-8 text-center space-y-2">
                        <h1 className="text-4xl font-retro font-bold text-black">
                            Login
                        </h1>
                        <p className="text-sm text-gray-600 font-mono-retro">
                            [ ACCESS REQUIRED ]
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-black">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-white border-2 border-black/20 rounded-lg px-4 py-3 text-black placeholder-gray-400 outline-none focus:border-black/50 focus:ring-1 focus:ring-black/10 transition"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-black">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-white border-2 border-black/20 rounded-lg px-4 py-3 text-black placeholder-gray-400 outline-none focus:border-black/50 focus:ring-1 focus:ring-black/10 transition"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-retro w-full bg-black text-white border-2 border-black py-3 rounded-lg font-medium font-retro text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t-2 border-black/10 text-center">
                        <p className="text-sm text-gray-600">
                            No account?{' '}
                            <a
                                href="/register"
                                className="font-medium text-black hover:underline"
                            >
                                Register here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Login;