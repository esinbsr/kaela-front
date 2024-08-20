import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, resetMessages } from "../actions/userAction";
import Message from "../components/utils/Message";

const Login = () => {
  // State variables to handle input values for email and password fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Accessing error and user role from Redux store
  const userRole = useSelector((state) => state.user.role);
  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);

  // Hooks to dispatch actions and navigate between routes
  const navigate = useNavigate();
  const dispatch = useDispatch();

 // Reset messages and states when the component mounts
  useEffect(() => {
    dispatch(resetMessages());
  }, [dispatch]);

  // Handler function for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetMessages()); // Clear previous messages before submission
    const formData = { email, password }; // Creating an object with email and password
    dispatch(loginUser(formData)); // Dispatching the login action with form data
  };

  // Effect that runs when userRole changes; it handles navigation after login
  useEffect(() => {
    if (userRole) {
      // Check if userRole is set (indicating successful login)
      if (userRole === "admin") {
        navigate("/admin"); // Navigate to the admin page if the user is an admin
      } else {
        navigate("/"); // Otherwise, navigate to the home page
      }
    }
  }, [userRole, navigate]);

  return (
    <div>
      {/* Form for email and password input */}
      <form onSubmit={handleSubmit} className="signup-login">
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
          aria-required="true" // Accessibility attribute indicating the field is required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)} // Update password state on change
          name="password"
          value={password}
          aria-required="true" // Accessibility attribute indicating the field is required
        />

        <button type="submit">Login</button>

        <p>
          No account yet?
          <Link to="/signup" className="signup-login__link">
             Sign up here
          </Link>
        </p>
      </form>

      {/* Display success or error messages */}
      {message && <Message message={message} type="success" />}
      {error && <Message message={error} type="error" />}
    </div>
  );
};

export default Login;
