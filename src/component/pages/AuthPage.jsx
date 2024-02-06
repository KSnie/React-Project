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
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      onAuthentication(true, username, password);
    } else {
      setErrorMessage("Wrong username or password. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      {isLogin ? (
        <LoginForm
          onAuthentication={handleAuthenticationLocal}
          handleToggleForm={handleToggleForm}
          errorMessage={errorMessage}
        />
      ) : (
        <RegisterForm onAuthentication={onAuthentication} />
      )}
    </div>
  );
};

export default AuthPage;
