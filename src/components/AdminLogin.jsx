// src/Login.js

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthProvider from './AuthContext';

const AdminLogin = () => {
const Navigate= useNavigate();
    const AuthContext= useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[showErrorMessage,setShowErrorMessage]=useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here

    if(AuthContext.login(username,password)

    ){
        Navigate('/blog')
    }
    else{
        setShowErrorMessage(true);
    }
  
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>

              {showErrorMessage && <div className="alert alert-danger mt-3">Enter valid details</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default  AdminLogin;
