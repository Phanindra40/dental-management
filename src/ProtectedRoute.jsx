// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "./utils/localStorage";

const ProtectedRoute = ({ children, role }) => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
