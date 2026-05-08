import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const PublicRoute = ({ children }) => {
    const { token } = useAuth();
    // Redirect back to authenticated users to home route

    if (token) {
        return <Navigate to="/" />
    }

    return children;
}

export default PublicRoute;


