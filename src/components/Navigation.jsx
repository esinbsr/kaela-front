import { NavLink } from "react-router-dom";


const Navigation = () => {
    return (
        <div>
            <NavLink to="/">home</NavLink>
            <NavLink to="/signupLogin">Signup/Login</NavLink>      
            <NavLink to="/contact">Contact</NavLink>      
            <NavLink to="/admin">Admin</NavLink>      
        </div>
    );
};

export default Navigation;