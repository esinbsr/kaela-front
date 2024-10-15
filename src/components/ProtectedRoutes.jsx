import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = ({ children, requiredRole }) => {
  const { auth } = useContext(AuthContext); 

  if (!auth.token || (requiredRole && auth.role !== requiredRole)) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;
