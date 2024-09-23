import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, resetMessages } from "../actions/userAction";
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Accessing the user role and error state from Redux store
  const userRole = useSelector((state) => state.user.role);
  const error = useSelector((state) => state.user.error);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Reset messages when the component mounts
  useEffect(() => {
    dispatch(resetMessages());
    window.scrollTo(0, 0);
  }, [dispatch]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(resetMessages()); // Clear previous messages before submission
    const formData = { email, password }; 
    dispatch(loginUser(formData)); 
  };

  // Redirect based on user role after successful login
  useEffect(() => {
    if (userRole) {
      if (userRole === "admin") {
        navigate("/admin"); 
      } else {
        navigate("/"); 
      }
    }
  }, [userRole, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
    <section className="user-form">
      <h2>Login</h2>
      <div className="line"></div> {/* Decorative line below the heading */}
      <form onSubmit={handleSubmit} className="user-form__content">
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
          placeholder="Enter your password"
          aria-required="true" 
        />
        <button type="submit">Login</button>
        <p>
          No account yet?
          <Link to="/signup" className="user-form__link">
            Sign up here
          </Link>
        </p>
      </form>

      <ToastContainer />
    </section>
    <Footer/>
    </>
  );
};

export default Login;
