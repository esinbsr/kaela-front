import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { AuthContext } from "../context/AuthProvider";
import '../assets/styles/components/_navigation.scss';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false); // État pour ouvrir/fermer le menu

  // Récupérer les informations utilisateur depuis le AuthContext
  const { auth, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Inverse l'état d'ouverture du menu
  };

  return (
    <header>
      <nav className="navigation">
        <NavLink to="/" className="logo_kaela">
          <Logo />
        </NavLink>

        {/* Icône Burger pour mobile */}
        <button
          className="burger-icon"
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </button>

        {/* Menu de navigation */}
        <section className={`navigation_links ${menuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/collection"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Collection
          </NavLink>

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

          {/* Afficher le lien admin uniquement si l'utilisateur est connecté et est admin */}
          {auth.role === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </NavLink>
          )}

          {/* Si l'utilisateur est connecté, afficher le bouton de déconnexion */}
          {auth.token ? (
            <>
              <button
                onClick={() => {
                  logout(); 
                  setMenuOpen(false)
                }}
                 className="logout-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Si l'utilisateur n'est pas connecté, afficher Signup et Login */}
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
        </section>
      </nav>
    </header>
  );
};

export default Navigation;
