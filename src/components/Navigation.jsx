import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "./Logo";

const Navigation = () => {
  const role = useSelector((state) => state.user.role);
  const isLoggedIn = !!role;
  const [menuOpen, setMenuOpen] = useState(false); // État pour ouvrir/fermer le menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Inverse l'état d'ouverture du menu
  };

  return (
    <nav className="navigation">
      <NavLink to="/" className="logo_kaela">
        <Logo />
      </NavLink>

      {/* Icone Burger pour mobile */}
      <div className="burger-icon" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>

      {/* Ajout de la classe 'open' si menuOpen est true */}
      <div className={`navigation_links ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMenuOpen(false)} // Ferme le menu lors d'un clic sur un lien
        >
          Home
        </NavLink>

        <div className="dropdown">
          <NavLink
            to="/collection"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Collection
          </NavLink>
          <div className="dropdown-content">
            <NavLink
              to="/eveningDresses"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Evening dresses
            </NavLink>
            <NavLink
              to="/latestCollection"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Latest collection
            </NavLink>
          </div>
        </div>

        <NavLink
          to="/aboutMe"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMenuOpen(false)}
        >
          About me
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </NavLink>

        {!isLoggedIn && (
          <>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Signup
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          </>
        )}
        {role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Admin
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink
            to="/logout"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Logout
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
