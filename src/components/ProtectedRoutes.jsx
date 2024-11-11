import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

// Component to protect routes accessible only to authenticated admin users
const ProtectedRoutes = ({ children }) => {
  const { auth } = useContext(AuthContext); // Retrieve authentication information from context

  // Check if the user is authenticated and has the 'admin' role
  if (!auth.token || auth.role !== "admin") {
    return <Navigate to="/" />; // Redirect to home if not authenticated or not admin
  }

  return children; // Render the protected component if authenticated as admin
};

export default ProtectedRoutes;
