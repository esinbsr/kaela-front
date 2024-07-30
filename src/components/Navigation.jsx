import { NavLink } from "react-router-dom";

const Navigation = () => {
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
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/login">Login</NavLink>
        {/* <NavLink to="/logout">logout</NavLink> */}
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </div>
    </div>
  );
};

export default Navigation;
