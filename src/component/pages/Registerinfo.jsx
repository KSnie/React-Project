import React, { useState } from "react";
import logoIcon from "../image/logo.svg";
import "../css-pages/Registerinfo.css";
import fullnameIcon from "../image/fullnameIcon.svg";
import dateIcon from "../image/dateIcon.svg";
import PhoneIcon from "../image/phoneIcon.svg";
import mapIcon from "../image/mapIcon.svg";
import profileIcon from "../image/Registerbanner.svg";

const Registerinfo = ({ onAuthentication, isRegisterpc }) => {
  const [isfullname, setFullname] = useState("");
  const [isdateofbirth, setDateofbirth] = useState("");
  const [isphonenumber, setPhonenumber] = useState("");
  const [iscountry, setCountry] = useState("");

  const handleSubmit = (e) => {

    try {
      onAuthentication("registerinfo", NaN,NaN,NaN,isfullname, isdateofbirth, isphonenumber, iscountry,NaN);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <div className="Registerinfo-container">
        <div className="Login-header">
          <img src={logoIcon} alt = "logo-icon" />
        </div>

        <div className="Registerinfo-content-container">
          <div className="Registerinfo-content-header">
            <h2>Complete Your Registration</h2>
          </div>

          <div className="Registerinfo-main-content">
            <div className="Registerinfo-left-content">

              <div className="Registerinfo-fullname-form-register">
                <h4>Name</h4>
                <form className="Registerinfo-fullname-input-register">
                  <img src={fullnameIcon} alt="user-icon" />
                  <input
                    type="text"
                    value={isfullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Enter your Fullname"
                  />
                </form>
              </div>

              <div className="Registerinfo-dateAndPhone-form-register">
                <div className="Registerinfo-date-form-register">
                  <h4>Date of Birth</h4>
                  <form className="Registerinfo-dateofbirth-input-register">
                    <img src={dateIcon} alt="date-icon" />
                    <input
                      type="date"
                      value={isdateofbirth}
                      onChange={(e) => setDateofbirth(e.target.value)}
                    />
                  </form>
                </div>

                <div className="Registerinfo-Phone-form-register">
                  <h4>Phone Number</h4>
                  <form className="Registerinfo-phone-input-register">
                    <img src={PhoneIcon} alt="Phone-icon" />
                    <input
                      type="tel"
                      value={isphonenumber}
                      onChange={(e) => setPhonenumber(e.target.value)}
                      placeholder="Phone number"
                    />
                  </form>
                </div>
              </div>

              <div className="Registerinfo-mapIcon-form-register">
                <h4>Country</h4>
                <form className="Registerinfo-mapIcon-input-register">
                  <img src={mapIcon} alt="user-icon" />


                  {/* <input
                    type="text"
                    value={iscountry}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                  /> */}

                    <select id="country" onChange={(e) => setCountry(e.target.value)} name="country">
                      <option value="Canada">Canada</option>
                      <option value="France">France</option>
                      <option value="Taiwan">Taiwan</option>
                      <option selected="selected"value="Thailand">Thailand</option>
                      <option value="United States">United States</option>
                  </select>

                </form>
              </div>

              <div className="Registerinfo-button">
                <div className="Registerinfo-nextpage">
                  <button onClick={() => { handleSubmit(); }}>Submit</button>
                </div>
              </div>

            </div>

            <div className="Registerinfo-Right-content">
              <img src={profileIcon} alt="profileIcon" />
              <h4>Select Image</h4>
            </div>
            
          </div>
        </div>
      </div>




      {/* <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setFullname(e.target.value)} placeholder="Full Name" />

        <input type="date" onChange={(e) => setDateofbirth(e.target.value)} placeholder="Date of Birth" />

        <input type="tel" onChange={(e) => setPhonenumber(e.target.value)} placeholder="Phone Number" />

        <input type="text" onChange={(e) => setCountry(e.target.value)} placeholder="Country" />

        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default Registerinfo;
