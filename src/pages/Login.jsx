import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import { loginUser } from "../api/userApi";
import { AuthContext } from "../context/AuthProvider";
import "../assets/styles/pages/_user-form.scss";
import { Helmet } from "react-helmet-async";

const Login = () => {
  // State variables for email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Using useNavigate for page navigation
  const navigate = useNavigate();

  // Access authentication context (auth data and login function)
  const { auth, login } = useContext(AuthContext);

  // Redirect if the user is already logged in
  useEffect(() => {
    window.scrollTo(0, 0);
    if (auth.token) {
      navigate("/");
    }
  }, [auth.token, navigate]);

  // Set up mutation for user login using react-query
  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      if (data.success) {
        // Call login function from context to store user information (token, userId, role) in localStorage and context
        login({ token: data.token, userId: data.user_id, role: data.role });

        // Redirect based on user role (admin or regular user)
        if (data.role === "admin") {
          navigate("/admin"); // Redirect to admin dashboard
        } else {
          navigate("/"); // Redirect to homepage
        }
      } else {
        toast.error(data.message); // Display error toast if login failed
      }
    },
    onError: (error) => {
      toast.error("Server error: " + error.message); // Display error toast in case of server error
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    mutation.mutate({ email, password }); // Trigger the mutation with the email and password
  };

  return (
    <>
      <Helmet>
        <title>Kaela Couture | Login</title>
        <meta
          name="description"
          content="Log in to your Kaela Couture account to leave comments on products."
        />
      </Helmet>

      <section className="user-form">
        <h2>Login</h2>
        <div className="line"></div>
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
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Logging in..." : "Login"}
          </button>
          <p>
            Don&apos;t have an account?
            <Link to="/signup" className="user-form__link">
              Sign up here!
            </Link>
          </p>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default Login;
