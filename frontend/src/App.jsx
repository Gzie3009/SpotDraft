import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import ForgotPassword from "@/pages/ForgotPassword";
import useStore from "@/lib/store";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // If using a utility function for classNames
import { Card, CardContent } from "@/components/ui/card";

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-8 shadow-lg rounded-lg">
        <CardContent className="flex flex-col items-center gap-4">
          <LoaderCircle className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-lg font-medium text-gray-700">
            Loading...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const loading = useStore((state) => state.loading);

  if (loading) return <LoadingScreen />; // Show loading screen while checking auth

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const setUser = useStore((state) => state.setUser);
  const setAuthenticated = useStore((state) => state.setAuthenticated);
  const setLoading = useStore((state) => state.setLoading);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/auth/profile", {
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Ensures cookies are sent
        });

        if (!response.ok) throw new Error("Not authenticated");

        const data = await response.json();
        setUser(data);
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
        setChecked(true);
      }
    };

    checkAuth();
  }, [setUser, setAuthenticated, setLoading]);

  if (!checked) return <LoadingScreen />; // Prevent flashing incorrect UI

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
