import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../actions/serverRequest";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password
    };

    try {
      const response = await axios.post(`${API_URL}login`, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.data.success) {
        const { token } = response.data; //Extrait le token de la réponse
        localStorage.setItem("token : ", token); // Stocke le token dans le localStorage
        setResponseMessage(response.data.message); // Met à jour le message de réponse

      } else {
        setResponseMessage(response.data.message); 
      }

    } catch (error) {
      console.error("Error sending data:", error);
      setResponseMessage("An error occurred during login"); 
    }
  };

  const verifyToken = async (token) => {
    try {
      const response = await axios.post(`${API_URL}verifyToken`, { token }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.data.success) {
        const newToken = response.data.token;
        const updatedToken = response.data.updatedToken;

        if (updatedToken) {
          localStorage.setItem("token", newToken); // Met à jour le token dans le localStorage si renouvelé
        }
      } else {
        setResponseMessage(response.data.message); // Met à jour le message de réponse en cas d'échec de la vérification
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      setResponseMessage("An error occurred while verifying the token"); // Affiche un message d'erreur en cas d'exception
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Récupère le token stocké dans le localStorage du navigateur
    if (token) {
      verifyToken(token); // Vérifie le token s'il existe
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
        />

        <button type="submit">Login</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>} 
    </div>
  );
};

export default Login;
