import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false); // État pour ouvrir/fermer le menu

  // Récupérer les informations utilisateur depuis Redux
  const { token, role } = useSelector((state) => state.user);

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

          {/* Afficher les liens en fonction de l'état de connexion */}
          {token ? (
            <>
              {/* Si l'utilisateur est connecté et admin, afficher le lien admin */}
              {role === 'admin' && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </NavLink>
              )}

              {/* Lien pour la déconnexion */}
              <NavLink
                to="/logout"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              {/* Si l'utilisateur n'est pas connecté, afficher Login et Signup */}
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
