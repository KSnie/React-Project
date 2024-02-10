import React, { useState } from "react";

const RegisterForm = ({ onAuthentication , isRegisterpc ,isRegister}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [Secondpassword, setSecondPassword] = useState();



  const handleSubmit = (e) => {
    // e.preventDefault();

    try {
      onAuthentication("register", username, password);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
      <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
      {/* <input type="number" onChange={(e) => setSecondPassword(e.target.value)} placeholder="password agin"/> */}

      <button onClick={() => { isRegister(); handleSubmit(); }}>Register next page</button>
      <button onClick={() => { isRegisterpc(); handleSubmit(); }}>Register PC</button>

    </div>
    
  );
};

export default RegisterForm;
