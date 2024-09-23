import { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import Footer from "../../components/Footer";

const AdminNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    } 
  }, [navigate, location.pathname]);

  return (
    <>
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
    {/* <Footer/> */}
    </>
  );
};

export default AdminNavigation;
