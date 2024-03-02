import React from "react";
import "../css-pages/Pcsent.css";
import logoIcon from "../image/logo.svg";

const Pcsent = ({handleToggleForm ,isRegisterpc, isPcRequest}) => {
  return (
    <div>
      <div className="Project-main-content">
        <div className="Login-header">
          <img src={logoIcon} alt = "logo-icon" />
        </div>

        <div className="Project-content-container">
          <h2>The request has been sent. Please wait for a response from Admin 1-2 day.</h2>
          <button onClick={() => { handleToggleForm(); isRegisterpc(); isPcRequest(); }}>Back to login</button>
        </div>
      </div>
    </div>
  );
};

export default Pcsent;
