import React, { useState } from "react";
import "../css-pages/RegisterForm.css";
import logoIcon from "../image/logo.svg";
import userIcon from "../image/userIcon.svg";
import banner from "../image/Registerbanner.svg";
import passwordIcon from "../image/passwordIcon.svg";

const RegisterForm = ({ onAuthentication , isLogin, isRegisterpc ,isRegister}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [Secondpassword, setSecondPassword] = useState();

  const handleSubmit = (e) => {

    try {
      onAuthentication("register", username, password, gender);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <div className="RegisterF-container">
        <div className="Login-header">
          <img src={logoIcon} alt="logo-icon" />
        </div>

        <div className="RegisterF-main-content">
          <div className="RegisterF-container-left">
            <div className="content-text-top">
              <h3>Sign Up</h3>
              <p>If you already have an account register</p>
              <h4 onClick={() => { isLogin();}} >Login here</h4>
            </div>

            <div className="Username-form-register">
              <h4>Username</h4>
              <form className="Username-input-register">
                <img src={userIcon} alt="user-icon" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your Username"
                />
              </form>
            </div>

            <div className="Password-form-register">
              <h4>Password</h4>
              <form className="Password-input-register">
                <img src={passwordIcon} alt="user-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                />
              </form>
            </div>

            <div className="Second-Password-form-register">
              <h4>Confirm Password</h4>
              <form className="Second-Password-input-register">
                <img src={passwordIcon} alt="user-icon" />
                <input
                  type="password"
                  value={Secondpassword}
                  onChange={(e) => setSecondPassword(e.target.value)}
                  placeholder="Enter your Password"
                />
              </form>
            </div>
            
            <div className="Gender-form-register">
              <h4>Gender :</h4>

              <input type='radio' value ="Male" id='male' name='radio' onChange={(e) => setGender(e.target.value)} />
              <label for='male'>Male</label>
              <input type='radio' value ="Female" id='female' name='radio' onChange={(e) => setGender(e.target.value)}/>
              <label for='female'>Female</label>
            </div>

            <div className="Registerf-button">
              <div className="Register-nextpage">
                <button onClick={() => { isRegister(); handleSubmit(); }}>Register next page</button>
              </div>
              <div className="Register-Pc">
                <button onClick={() => { isRegisterpc(); handleSubmit(); }}>Register PC</button>
              </div>
            </div>

          </div>

          <div className="RegisterF-container-Right">
            <img src={banner} alt="banner" />
            <h4>Join us now</h4>
            <p>And start your dream acting careers!</p>
          </div>
        </div>
      </div>


      {/* <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
      <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder="password"/>

      <input type="checkbox" onChange={(e) => setGender(e.target.value)} name="gender" value="male" />
      <input type="checkbox" onChange={(e) => setGender(e.target.value)} name="gender" value="Female" /> */}

      {/* <input type="number" onChange={(e) => setSecondPassword(e.target.value)} placeholder="password agin"/> */}

      {/* <button onClick={() => { isRegister(); handleSubmit(); }}>Register next page</button>
      <button onClick={() => { isRegisterpc(); handleSubmit(); }}>Register PC</button> */}

    </div>
    
  );
};

export default RegisterForm;
