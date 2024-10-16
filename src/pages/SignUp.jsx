import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import { toast } from "react-toastify"; 
import Footer from "../components/Footer";
import { addUser } from "../api/userApi";
import { AuthContext } from "../context/AuthContext"; 

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  // Redirection si l'utilisateur est déjà connecté
  useEffect(() => {
  window.scrollTo(0,0);
    if (auth.token) {
      navigate("/");
    }
  }, [auth.token, navigate]);

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ username, email, password });
  };

  return (
    <>
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
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Signing up..." : "Sign Up"}
          </button>
          <p>Already have an account? <Link to="/login" className="user-form__link"> Sign in here!</Link></p>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default SignUp;
