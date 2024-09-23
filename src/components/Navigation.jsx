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

          {/* Liens pour l'inscription et la connexion */}
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

          {/* Lien Admin pour les administrateurs */}
          {role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </NavLink>
          )}

          {/* Lien de déconnexion pour les utilisateurs connectés */}
          {isLoggedIn && (
            <NavLink
              to="/logout"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Logout
            </NavLink>
          )}
        </section>
      </nav>
    </header>
  );
};

export default Navigation;
