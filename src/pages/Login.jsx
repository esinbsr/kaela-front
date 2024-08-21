import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, resetMessages } from "../actions/userAction";
import Message from "../components/utils/Message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userRole = useSelector((state) => state.user.role);
  const error = useSelector((state) => state.user.error);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetMessages());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetMessages());
    const formData = { email, password };
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (userRole) {
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [userRole, navigate]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="user-form">
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
        <button type="submit">Login</button>
        <p>
          No account yet? <Link to="/signup" className="form-link">Sign up here</Link>
        </p>
      </form>
      {error && <Message message={error} type="error" />}
    </div>
  );
};

export default Login;
