import { NavLink } from "react-router-dom";


const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink to="/" className="logo_kaela">KAELA</NavLink>
      
      <div className="navigation_links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/eveningDresses">Collection</NavLink>
        <NavLink to="/about">About me</NavLink>
        <NavLink to="/signupLogin">Signup/Login</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </div>
    </div>
  );
};

export default Navigation;
