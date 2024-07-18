import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8888/travail-perso/kaela-couture/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const message = response.data.message || "No message returned";
      setResponseMessage(message);
      setErrorMessage("");  // Clear any previous error messages

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setResponseMessage("");  // Clear any previous success messages
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
        />

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

        <button type="submit">Sign Up</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default SignUp;
