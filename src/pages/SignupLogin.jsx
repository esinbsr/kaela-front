import { NavLink } from "react-router-dom";
import Navigation from "../components/Navigation";

const SignupLogin = () => {
    return (
        <div>
            <Navigation/>

            <NavLink to="/signup">
              Sign Up
            </NavLink>

            <NavLink to="/login">
              Login
            </NavLink>

            
            
        </div>
    );
};

export default SignupLogin;