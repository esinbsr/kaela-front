import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { AuthContext } from "../context/AuthProvider";
import "../assets/styles/components/_navigation.scss";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to open/close the menu

  // Retrieve user information from AuthContext
  const { auth, logout } = useContext(AuthContext);

  // Toggle menu open/close state
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className="navigation">
        <NavLink to="/" className="logo_kaela">
          <Logo /> {/* Logo component as a link to home */}
        </NavLink>

        {/* Burger icon for mobile menu */}
        <button
          className="burger-icon"
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </button>

        {/* Navigation menu links */}
        <section className={`navigation_links ${menuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)} // Close menu on link click
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

          {/* Show admin link only if the user is logged in and has an admin role */}
          {auth.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </NavLink>
          )}

          {/* If the user is logged in, show the logout button */}
          {auth.token ? (
            <>
              <button
                onClick={() => {
                  logout(); // Call logout function
                  setMenuOpen(false); // Close menu after logout
                }}
                className="logout-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* If the user is not logged in, show Signup and Login links */}
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
