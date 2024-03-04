import React, { useState } from "react";
import LoginForm from "./L_LoginForm"; // Import your LoginForm component
import RegisterForm from "./L_RegisterForm"; // Import your RegisterForm component
import RegisterFormPc from "./L_RegisterFormPc";
import Registerinfo from "./L_Registerinfo";
import Pcsent from "./L_Pcsent";
import axios from "axios";

const AuthPage = ({ onAuthentication }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegisterpc, setRegisterpc] = useState(true);
  const [isRegister, setRegister] = useState(true);
  const [isPcRequest, setPcRequest] = useState(true);

  const [isusername, setUsername] = useState("");
  const [ispassword, setPassword] = useState("");
  const [isgender, setGender] = useState("");

  const handleToggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
    setErrorMessage(""); // Clear error message when toggling forms
  };

  const handleToggleFormRegisterPC = () => {
    setRegisterpc((prevIsRegisterpc) => !prevIsRegisterpc);
  };

  const handleToggleFormRegister = () => {
    setRegister((prevIsRegister) => !prevIsRegister);
  };

  const handleToggleFormisPcRequest = () => {
    setPcRequest((prevIsRegisterRequest) => !prevIsRegisterRequest);
  };

  const handleAuthenticationLocal = async (
    option,
    username,
    password,
    gender,
    fullname,
    dateofbirth,
    phonenumber,
    country
  ) => {
    if (option === "login") {
      try {
        const res = await axios.post("http://localhost:3000/login", {
          username,
          password,
        });
        onAuthentication(res.data);
      } catch (error) {
        console.error("Error during login:", error);
      }
    } else if (option === "register") {
      setUsername(username);
      setPassword(password);
      setGender(gender);
    } else if (option === "registerinfo") {
      let [f_name, l_name] = fullname.split(" ");
      const response = await axios.post("http://localhost:3000/newuser", {
        isusername,
        ispassword,
        role: "user",
        isgender,
        f_name,
        l_name,
        dateofbirth,
        phonenumber,
        country,
      });
      onAuthentication(response.data);
      handleToggleForm();
      handleToggleFormRegister();
    } else if (option === "registerPc") {
      let [f_name, l_name] = fullname.split(" ");
      const response = await axios.post("http://localhost:3000/newuserpc", {
        isusername,
        ispassword,
        role: "request",
        isgender,
        f_name,
        l_name,
        dateofbirth,
        phonenumber,
        country,
      });
      onAuthentication(response.data);
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
      ) : isRegisterpc ? (
        isRegister ? (
          <RegisterForm
            onAuthentication={handleAuthenticationLocal}
            isLogin={handleToggleForm}
            isRegisterpc={handleToggleFormRegisterPC}
            isRegister={handleToggleFormRegister}
          />
        ) : (
          <Registerinfo onAuthentication={handleAuthenticationLocal} />
        )
      ) : isPcRequest ? (
        <RegisterFormPc
          onAuthentication={handleAuthenticationLocal}
          isPcRequest={handleToggleFormisPcRequest}
        />
      ) : (
        <Pcsent
          handleToggleForm={handleToggleForm}
          isRegisterpc={handleToggleFormRegisterPC}
          isPcRequest={handleToggleFormisPcRequest}
        />
      )}
    </div>
  );
};

export default AuthPage;
