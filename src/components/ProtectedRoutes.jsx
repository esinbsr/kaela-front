import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import apiClient from '../api/apiClient';


const checkAdminAccess = async () => {
  try {
    // Requête à l'API pour vérifier si l'utilisateur est admin
    const response = await apiClient.post('admin');
    return response.data; // Retourner les données reçues
  } catch (error) {
    console.error('Erreur API:', error);
    return { success: false, message: "Erreur d'accès ou droits insuffisants" };
  }
};

// Composant pour protéger les routes
const ProtectedRoutes = ({ children }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer le rôle et le token de Redux
  const { role, token } = useSelector((state) => state.user);

  useEffect(() => {
    const verifyAccess = async () => {
      if (role === 'admin' && token) {
        // Si le rôle est admin, vérifier l'accès avec l'API
        const response = await checkAdminAccess();

        if (response.success) {
          setHasAccess(true); // Accès accordé
        } else {
          setError(response.message || "Accès refusé.");
          setHasAccess(false); // Accès refusé
        }
      } else {
        setError("Vous n'avez pas les droits nécessaires.");
        setHasAccess(false);
      }
      setIsLoading(false); // Fin du chargement
    };

    

    verifyAccess();
  }, [role, token]);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  // Si l'accès est accordé, afficher les composants enfants
  return hasAccess ? children : <p>Accès refusé</p>;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoutes;
