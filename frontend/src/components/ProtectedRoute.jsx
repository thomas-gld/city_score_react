import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import du hook de ton contexte

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;