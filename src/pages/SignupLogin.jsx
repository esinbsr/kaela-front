import { NavLink } from "react-router-dom";
const SignupLogin = () => {
    return (
        <div>
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