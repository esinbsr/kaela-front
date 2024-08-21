import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from './Logo';

const Navigation = () => {
  const role = useSelector((state) => state.user.role);
  const isLoggedIn = !!role;

  return (
    <div className="navigation">
      <NavLink to="/" className="logo_kaela"><Logo/></NavLink>
      <div className="navigation_links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>

        <div className="dropdown">
          <NavLink to="/collection" className={({ isActive }) => (isActive ? 'active' : '')}>Collection</NavLink>
          <div className="dropdown-content">
            <NavLink to="/eveningDresses" className={({ isActive }) => (isActive ? 'active' : '')}>Evening dresses</NavLink>
            <NavLink to="/latestCollection" className={({ isActive }) => (isActive ? 'active' : '')}>Latest collection</NavLink>
          </div>
        </div>

        <NavLink to="/aboutMe" className={({ isActive }) => (isActive ? 'active' : '')}>About me</NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>

        {!isLoggedIn && (
          <>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>Signup</NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>
          </>
        )}
        {role === 'admin' && <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>Admin</NavLink>} 
        {isLoggedIn && <NavLink to="/logout" className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink>} 
      </div>
    </div>
  );
};

export default Navigation;
