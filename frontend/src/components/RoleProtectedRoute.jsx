import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleProtectedRoute({ children }) {
  const { role } = useAuth();

  if (role !== "admin") {
    return <Navigate to="/products" />;
  }

  return children;
}

export default RoleProtectedRoute;