import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const ProtectedRoutes = ({ children }) => {
  const { auth } = useContext(AuthContext); 

  // Vérifie si l'utilisateur est authentifié et s'il a le rôle 'admin'
  if (!auth.token || auth.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return children;
};

export default ProtectedRoutes;