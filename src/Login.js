import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import './App.css';

const Login = () => {
  const [name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Dummy authentication
    if (name === "user" && password === "password") {
      login();
      navigate("/home");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            type="text"
            placeholder="UserName"
            value={name}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="input-container">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        
          <button className="button" type="submit">Login</button>
       
      </form>
    </div>
  );
};

export default Login;
