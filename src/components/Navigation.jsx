import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const role = useSelector((state) => state.user.role); // Allows access to the current state of the Redux store and returns the value of the user's role property
  const isLoggedIn = !!role; // !! converts any value to a boolean, it checks if role is defined and not null

  return (
    <div className="navigation">
      <NavLink to="/" className="logo_kaela">KAELA</NavLink>

      <div className="navigation_links">
        <NavLink to="/">Home</NavLink>

        <div className="dropdown">
          <NavLink to="/collection">Collection</NavLink>
          <div className="dropdown-content">
            <NavLink to="/eveningDresses">Evening dresses</NavLink>
            <NavLink to="/latestCollection">Latest collection</NavLink>
          </div>
        </div>

        <NavLink to="/aboutMe">About me</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        {!isLoggedIn && (
          <>
            <NavLink to="/signup">Signup</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
        {role === 'admin' && <NavLink to="/admin">Admin</NavLink>} 
        {isLoggedIn && <NavLink to="/logout">Logout</NavLink>} 
      </div>
    </div>
  );
};

export default Navigation;