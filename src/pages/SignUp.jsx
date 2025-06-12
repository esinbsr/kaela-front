import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import { addUser } from "../api/userApi";
import { AuthContext } from "../context/AuthProvider";
import "../assets/styles/pages/_user-form.scss";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  // State variables for username, email, and password input fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);

  // Navigation hook to redirect user
  const navigate = useNavigate();

  // Get authentication state from context
  const { auth } = useContext(AuthContext);

  // Effect hook to redirect the user if they are already authenticated
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount
    if (auth.token) {
      navigate("/"); // If the user is already logged in, redirect to homepage
    }
  }, [auth.token, navigate]);

  // Mutation setup for registering a new user
  const mutation = useMutation({
    mutationFn: addUser, // Function to call when mutation is triggered
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message); // Show success toast if user is created successfully
        navigate("/login"); // Redirect to login page after successful sign-up
        setConsent(false);
      } else {
        toast.error(data.message); // Show error toast if the response has an error message
      }
    },
    onError: (error) => {
      toast.error("Server error: " + error.message); // Show error toast in case of server error
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    mutation.mutate({ username, email, password, consent }); // Trigger the mutation with username, email, and password
  };

  return (
    <>
      <Helmet>
        <title>Kaela Couture | Sign Up</title>
        <meta
          name="description"
          content="Create a Kaela Couture account to comment on products."
        />
      </Helmet>
      <section className="user-form">
        <h2>Sign Up</h2>
        <div className="line"></div>
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
          <div className="singup__form-footer">
            <div className="signup__form-checkbox">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />

              <label htmlFor="consent">
              I agree to the collection and processing of my personal data by www.kaela-couture.com.
              </label>
            </div>
            <Link to="/privacyPolicy">
            See the confidentiality policy.
            </Link>
          </div>

          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Signing up..." : "Sign Up"}
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="user-form__link">
              {" "}
              Sign in here!
            </Link>
          </p>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default SignUp;
