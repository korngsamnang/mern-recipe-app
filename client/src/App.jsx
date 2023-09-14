import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateRecipePage from "./pages/CreateRecipePage.jsx";
import SavedRecipePage from "./pages/SavedRecipePage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./ui/Navbar.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import AppLayout from "./ui/AppLayout.jsx";

import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <ReactQueryDevtools initialIsOpen={false} />
            <Navbar />
            <div className="container mx-auto max-w-5xl px-4 py-8">
                <Routes>
                    <Route
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            index
                            element={<Navigate replace to="/home" />}
                        />
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="/create-recipe"
                            element={<CreateRecipePage />}
                        />
                        <Route
                            path="/saved-recipes"
                            element={<SavedRecipePage />}
                        />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "#fff",
                        color: " #374151",
                    },
                }}
            />
        </div>
    );
};

export default App;
