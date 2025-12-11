import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Landing from "./pages/Landing.jsx";
import { AuthProvider, useAuth } from "./contexts/authContext/authContext.jsx";
import "./styles/globals.css";



// Protect dashboard route
function PrivateRoute({ children }) {
    const { userLoggedIn } = useAuth();
    return userLoggedIn ? children : <Navigate to="/auth" replace />;
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Landing page */}
                    <Route path="/home" element={<Landing />} />

                    {/* Auth page */}
                    <Route path="/auth" element={<Auth />} />

                    {/* Protected dashboard */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    {/* Default redirect */}
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}