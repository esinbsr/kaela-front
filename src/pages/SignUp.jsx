import { useState } from "react";
import axios from "axios";
import { API_URL } from "../actions/serverRequest";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post(`${API_URL}signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data); // Ajout du console log pour vérifier la réponse de l'API

      if (response.data.message) {
        setResponseMessage(response.data.message);
        navigate("/login")
      } else {
        setResponseMessage("No message returned");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setResponseMessage(""); 
    }
  };

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
      {responseMessage && <p>{responseMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default SignUp;
