import React, { useState } from "react";
import Logo from "../image/logo.svg";
import "../css-pages/LoginForm.css";
import userIcon from "../image/userIcon.svg";
import passwordIcon from "../image/passwordIcon.svg";
import hidepassIcon from "../image/hidepassIcon.svg";
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ errormessage, onSubmit }) => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    onSubmit(values);
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
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  placeholder="Enter your Username"
                />
              </form>
            </div>

            {errormessage.username && <p className="text-danger">{errormessage.username}</p>}

            <div className="Password-form">
              <h4>Password</h4>
              <form className="Password-input">
                <img src={passwordIcon} alt="pass-icon" />
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                />
                <img src={hidepassIcon} alt="show-hide password" />
              </form>
            </div>
            
            {errormessage.password && <p className="text-danger">{errormessage.password}</p>}

            <div className="forget-pass">
              <button>Forgot Password?</button>
            </div>

            {errormessage.notfound && <p className="text-danger">{errormessage.notfound}</p>}

            <div className="submit">
              <button onClick={handleSubmit}>Login</button>
            </div>

            <div className="Register">
              <h5>New User?</h5>
              <button onClick={() => navigate('/Register')}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
