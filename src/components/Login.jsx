import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Login.css'; // Ensure you have the proper CSS file for styling

const Login = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">Oops... {error.message}</div>;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="text-center">Login</h2>
        {!isAuthenticated ? (
          <button onClick={loginWithRedirect} className="btn_1 btn-primary_1 btn-block">
            <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '8px' }} />
           
            Login with Google
          </button>
        ) : (
          <p className="text-center">You are already logged in.</p>
        )}
      </div>
    </div>
  );
};

export default Login;
