import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    // Redirect back to unauthenticated users to login route

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default ProtectedRoute;


