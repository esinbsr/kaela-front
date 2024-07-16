import { NavLink } from "react-router-dom";

const AdminNavigation = () => {
    return (
        <div>
            <h2>Administration</h2>
            <NavLink to="/adminProduct">Product</NavLink>
            <NavLink to="/adminAddProduct">Add a product</NavLink>
            <NavLink to="/adminInformation">Information</NavLink>
            <NavLink to="/adminAddInformation">Add a information</NavLink>
        </div>
    );
};

export default AdminNavigation;