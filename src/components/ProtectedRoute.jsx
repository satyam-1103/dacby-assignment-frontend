import { useAuth } from "../contexts/AuthContext";
import Unauthorized from "../pages/Unauthorized";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    // If user is not authenticated, show a friendly unauthorized page
    if (!token) {
        return <Unauthorized />;
    }

    return children;
}

export default ProtectedRoute;


