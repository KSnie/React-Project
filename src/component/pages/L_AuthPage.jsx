import React, { useState } from "react";
import LoginForm from "./L_LoginForm"; // Import your LoginForm component
import RegisterForm from "./L_RegisterForm"; // Import your RegisterForm component
import RegisterFormPc from "./L_RegisterFormPc";
import Registerinfo from "./L_Registerinfo";
import Pcsent from "./L_Pcsent";

const AuthPage = ({ onAuthentication, data }) => {
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

  const handleAuthenticationLocal = (option,username, password ,gender , fullname,dateofbirth,phonenumber,county,detaillink) => {
    if (option === "login") {
      const foundUser = data.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        onAuthentication(true, username, password);
      } else {
        setErrorMessage("Wrong username or password. Please try again.");
      }
    } else if (option === "register") {
      setUsername(username)
      setPassword(password)
      setGender(gender)

    } else if (option === "registerinfo") {
      onAuthentication(true, isusername, ispassword , isgender, fullname, dateofbirth, phonenumber, county, detaillink);
    } else if (option === "registerPc") {
      onAuthentication(false, isusername, ispassword, isgender, fullname, dateofbirth, phonenumber, county,detaillink);
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
        isRegisterpc ? (
          isRegister ? (
            <RegisterForm onAuthentication={handleAuthenticationLocal} isLogin={handleToggleForm} isRegisterpc={handleToggleFormRegisterPC} isRegister={handleToggleFormRegister}/>
          ) : (
            <Registerinfo onAuthentication={handleAuthenticationLocal} />
          )
        ) : (
          isPcRequest ? (
            <RegisterFormPc onAuthentication={handleAuthenticationLocal} isPcRequest = {handleToggleFormisPcRequest} />
          ) : (
            <Pcsent handleToggleForm={handleToggleForm} isRegisterpc={handleToggleFormRegisterPC} isPcRequest = {handleToggleFormisPcRequest}/>
          )
        )
      )}
    </div>
  );
}

export default AuthPage;
