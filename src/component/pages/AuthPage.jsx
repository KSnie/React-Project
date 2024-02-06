import React, { useState } from "react";
import LoginForm from "./LoginForm"; // Import your LoginForm component
import RegisterForm from "./RegisterForm"; // Import your RegisterForm component

const AuthPage = ({ onAuthentication, data }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
    setErrorMessage(""); // Clear error message when toggling forms
  };

  const handleAuthenticationLocal = (username, password) => {
    const foundUser = data.find(
      (user) => user.username === username && user.password === password,
      console.log(password)
    );
  
    if (foundUser) {
      onAuthentication(true, username, password);
    } else {
      setErrorMessage("Wrong username or password. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {isLogin ? (
        <LoginForm onAuthentication={handleAuthenticationLocal} />
      ) : (
        <RegisterForm onAuthentication={onAuthentication} />
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>
        {isLogin
          ? "Don't have an account? "
          : "Already have an account? "}
        <span onClick={handleToggleForm} className="toggle-link">
          {isLogin ? "Register here" : "Login here"}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
