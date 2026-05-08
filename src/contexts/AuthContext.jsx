import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";

const AuthContext = createContext();

/**
 * Function: Auth Provider
 * Description: Provides authentication context to the application.
 */

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    )

    const [loading, setLoading] = useState(false);

    /**
   * Persist Login State
   */
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);

            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`;
        } else {
            localStorage.removeItem("token");

            delete api.defaults.headers.common[
                "Authorization"
            ];
        }
    }, [token]);

    /**
 * Register User
 */
    const register = async (formData) => {
        try {
            setLoading(true);

            const response = await api.post(
                "/auth/register",
                formData,
            );

            const data = response.data;

            setUser(data.user);

            setToken(data.token);

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Registration failed",
            };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Login User
     */
    const login = async (formData) => {
        try {
            setLoading(true);

            const response = await api.post(
                "/auth/login",
                formData,
            );

            const data = response.data;

            setUser(data.user);

            setToken(data.token);

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Login failed",
            };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logout User
     */
    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error(error);
        } finally {
            setUser(null);

            setToken(null);

            localStorage.removeItem("token");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Custom Hook
 */
export const useAuth = () => useContext(AuthContext);