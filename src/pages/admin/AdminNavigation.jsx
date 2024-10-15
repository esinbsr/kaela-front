// import { useEffect } from "react";
import { NavLink} from "react-router-dom";

const AdminNavigation = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const role = localStorage.getItem("role");
  //   if (role !== "admin") {
  //     navigate("/");
  //   } 
  // }, [navigate]);

  return (
    <div className="admin-container">
      <aside className="admin-container__navigation">
        <NavLink
          to="/displayProduct"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Product
        </NavLink>
        <NavLink
          to="/displayInformation"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Information about me
        </NavLink>
        <NavLink
          to="/displayCategory"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Category
        </NavLink>
        <NavLink
          to="/displaySocialNetwork"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Social network
        </NavLink>
      </aside>
    </div>
  );
};

export default AdminNavigation;
