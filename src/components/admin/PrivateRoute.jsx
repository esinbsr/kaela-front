import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, ...rest }) => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <p>Loading...</p>; // Ou un spinner de chargement
  }

  return user.role === 'admin' ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/not-authorized" />
  );
};

export default PrivateRoute;