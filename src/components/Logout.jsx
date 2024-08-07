import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userAction';

const Logout = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const dispatch = useDispatch(); // Hook to dispatch Redux actions

  useEffect(() => {
    // Ensures that the logout and redirect actions are executed immediately after the Logout component is mounted
    dispatch(logoutUser()); // Dispatch the logout action to update the Redux store
    navigate('/login'); // Navigate to the login page
  }, [dispatch, navigate]); // Dependencies to ensure the effect runs only once

  return null; // The Logout component does not render anything to the screen; its sole purpose is to execute the logout and redirect effects
};

export default Logout;
