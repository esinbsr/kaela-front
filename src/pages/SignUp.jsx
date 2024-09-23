import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser, resetMessages } from "../actions/userAction";
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 
import Footer from "../components/Footer";

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

  // Reset messages and states when the component mounts
  useEffect(() => {
    dispatch(resetMessages());
    window.scrollTo(0, 0);
  }, [dispatch]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(resetMessages()); 
    dispatch(addUser({ username, email, password }));
  };

  // Redirect to the login page after successful signup
  useEffect(() => {
    if (success) {
      toast.success("Sign up successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login"); 
      }, 2000);
    }
  }, [success, navigate]);

  // Show error notification if sign up fails
  useEffect(() => {
    if (error) {
      toast.error(error); 
    }
  }, [error]);

  return (
    // Main container for the signup form
    <>
    <section className="user-form">
      <h2>Sign Up</h2>
      <div className="line"></div> {/* Decorative line below the heading */}
      <form onSubmit={handleSubmit} className="user-form__content">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          value={username}
          placeholder="Choose a unique username" 
          aria-required="true" 
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
          placeholder="example@domain.com"
          aria-required="true"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
          placeholder="Create a strong password" 
          aria-required="true"
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account?
          <Link to="/login" className="user-form__link">
            Login here
          </Link>
        </p>
      </form>
      <ToastContainer />
    </section>
    <Footer/>
    </>
  );
};

export default SignUp;
