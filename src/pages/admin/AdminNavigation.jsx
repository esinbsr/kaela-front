import '../../assets/styles/components/_admin-naviagtion.scss';
import { NavLink} from "react-router-dom";

const AdminNavigation = () => {

  return (
    <div className="admin-navigation">
        <NavLink
          to="/productManager"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Product
        </NavLink>
        <NavLink
          to="/informationManager"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Information about me
        </NavLink>
        <NavLink
          to="/categoryManager"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Category
        </NavLink>
        <NavLink
          to="/socialNetworkManager"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Social network
        </NavLink>
    </div>
  );
};

export default AdminNavigation;
