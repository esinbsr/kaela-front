import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/userAction';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { email, password };

    try {
      await dispatch(loginUser(formData));
      navigate('/admin');
    } catch (error) {
      setResponseMessage('An error occurred during login');
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
      <p>No account yet? <Link to="/signup"> Create one here</Link></p>
    </div>
  );
};

export default Login;
