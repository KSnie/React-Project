import React, { useState } from "react";

const LoginForm = ({ onAuthentication }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform authentication check in the parent component (AuthPage)
    onAuthentication(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
