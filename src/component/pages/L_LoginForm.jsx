import React, { useState } from "react";
import Logo from "../image/logo.svg";
import "../css-pages/LoginForm.css";
import userIcon from "../image/userIcon.svg";
import passwordIcon from "../image/passwordIcon.svg";
import hidepassIcon from "../image/hidepassIcon.svg";

const LoginForm = ({ onAuthentication, handleToggleForm, errorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthentication("login",username, password);
  };

  return (
    <div className="main-content">
      <div className="login-container">
        <div className="Login-header">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="main-container">
          <div className="Main-Login-container">
            <div className="Main-header">
              <h3>Sign In</h3>
            </div>

            <div className="Username-form">
              <h4>Username</h4>
              <form className="Username-input">
                <img src={userIcon} alt="mail-icon" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your Username"
                />
              </form>
            </div>

            <div className="Password-form">
              <h4>Password</h4>
              <form className="Password-input">
                <img src={passwordIcon} alt="pass-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                />
                <img src={hidepassIcon} alt="show-hide password" />
              </form>
            </div>
            
            {errorMessage && <div className="Worng-password">{errorMessage}</div>}

            <div className="forget-pass">
              <button>Forgot Password?</button>
            </div>

            <div className="submit">
              <button onClick={handleSubmit}>Login</button>
            </div>

            <div className="Register">
              <h5>New User?</h5>
              <button onClick={handleToggleForm}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
