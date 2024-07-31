import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userAction';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => { //s'assure que les actions de déconnexion et de redirection sont exécutées immédiatement après que le composant Logout est monté
    dispatch(logoutUser());
    navigate('/login');
  }, [dispatch, navigate]);

  return null; //Le composant Logout ne rend rien à l'écran, son seul but est d'exécuter les effets de déconnexion et de redirection
};

export default Logout;
