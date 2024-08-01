import { useState } from "react";
import { addUser } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      email,
      password,
    };

    try {
      await dispatch(addUser(formData));
      navigate('/login');
    } catch (error) {
      // console.log("error");
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          value={username}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in here </Link></p>
      {/* {responseMessage && <p>{responseMessage}</p>} */}

    </div>
  );
};

export default SignUp;
