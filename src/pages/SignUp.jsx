import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser, resetMessages } from "../actions/userAction";
import Message from "../components/utils/Message";

const SignUp = () => {
  // State variables for form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access error, success, and message states from Redux store
  const error = useSelector((state) => state.user.error);
  const success = useSelector((state) => state.user.success);
  const message = useSelector((state) => state.user.message);

  // Reset messages and states when the component mounts
  useEffect(() => {
    dispatch(resetMessages());
  }, [dispatch]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(resetMessages()); // Clear previous messages before submission
    dispatch(addUser({ username, email, password })); // Dispatch the addUser action with form data
  };

  // Redirect to the login page after successful signup
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/login"); // Navigate to the login page after a 2 second delay
      }, 2000);
    }
  }, [success, navigate]);

  return (
    <div>
    <h1>Signup</h1>
    <form onSubmit={handleSubmit} className="user-form">
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        name="username"
        value={username}
        aria-required="true"
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        value={email}
        aria-required="true"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        value={password}
        aria-required="true"
      />
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? <Link to="/login" className="form-link">Login here</Link>
      </p>
    </form>
    {error && <Message message={error} type="error" />}
  </div>
  
  );
};

export default SignUp;
