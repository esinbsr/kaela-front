import { NavLink } from "react-router-dom";

const Admin = () => {
    return (
        <div>
            <NavLink to="/adminAddProduct">Add a product</NavLink>
            <NavLink>Update a product</NavLink>
            <NavLink>Delete a product</NavLink>
            
        </div>
    );
};

export default Admin;