import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const AdminNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate, location.pathname]);

    // Masquer le titre si l'utilisateur n'est pas sur la route "/admin"
  //   if (location.pathname !== "/admin") {
  //     setShowTitle(false);
  //   }

  return (
    <div className="admin-container">
      {/* {showTitle && <h1 id="h1-administration">Administration</h1>} */}
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
