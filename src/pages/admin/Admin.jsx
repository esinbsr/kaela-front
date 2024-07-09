import { NavLink } from "react-router-dom";
import Navigation from "../../components/Navigation";

const Admin = () => {
    return (
        <div>
            <Navigation/>
            <h2>Administration</h2>
            <NavLink to="/adminProduct">Product</NavLink>
            <NavLink to="/adminAddProduct">Add a product</NavLink>
            <NavLink to="/adminInformation">Information</NavLink>
            <NavLink to="/adminAddInformation">Add a information</NavLink>
        </div>
    );
};

export default Admin;