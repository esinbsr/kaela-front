import { useState } from "react";
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:8888/travail-perso/kaela-couture/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const message = response.data.message || "No message returned";
      setResponseMessage(message);

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token); // Stocke le token dans le stockage local
        console.log('Login successful, token stored.');
      }

    } catch (error) {
      console.error('Erreur lors de l\'envoi des données :', error);
    }
  };

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
