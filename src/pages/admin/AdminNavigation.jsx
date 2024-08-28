import { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const AdminNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    } else if (location.pathname === "/admin") {
      navigate("/adminProduct"); // Redirige vers /adminProduct si l'utilisateur est sur /admin
    }
  }, [navigate, location.pathname]);

  return (
    <div className="admin-container">
      <aside className="admin-container__navigation">
        <NavLink
          to="/adminProduct"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Product
        </NavLink>
        <NavLink
          to="/adminInformation"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Information about me
        </NavLink>
        <NavLink
          to="/adminCategory"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Category
        </NavLink>
        <NavLink
          to="/adminSocialNetwork"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Social network
        </NavLink>
      </aside>
    </div>
  );
};

export default AdminNavigation;
