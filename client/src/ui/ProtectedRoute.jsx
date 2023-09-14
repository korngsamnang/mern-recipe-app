import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser.js";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    // 1. Load the authenticated user
    const { isAuthenticated, isLoading } = useUser();

    // 2. If there is NO authenticated user, redirect to the /login
    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate("/login");
    }, [isAuthenticated, isLoading, navigate]);

    // 3. While loading, show a spinner
    if (isLoading) return <LoadingSpinner />;

    // 4. If there is a user, render the app
    if (isAuthenticated) return children;
};

export default ProtectedRoute;
