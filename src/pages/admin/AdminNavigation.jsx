import { NavLink } from "react-router-dom";

const AdminNavigation = () => {
    return (
        <div>
            <h1>Administration</h1>
            <NavLink to="/adminProduct">Product</NavLink>
            {/* <NavLink to="/adminAddProduct">Add a product</NavLink> */}
            <NavLink to="/adminInformation">Information</NavLink>
            {/* <NavLink to="/adminAddInformation">Add a information</NavLink> */}
            <NavLink to="/adminCategory">Category</NavLink>
        </div>
    );
};

export default AdminNavigation;