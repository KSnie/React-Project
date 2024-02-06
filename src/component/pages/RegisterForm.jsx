import React, { useState } from "react";

const RegisterForm = ({ onAuthentication }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      onAuthentication(true, username, password);
    } catch (error) {
      console.error("Registration failed:", error);
    }
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
