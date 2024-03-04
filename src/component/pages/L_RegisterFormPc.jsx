import React, { useState } from "react";
import logoIcon from "../image/logo.svg";
import fullnameIcon from "../image/fullnameIcon.svg";
import dateIcon from "../image/dateIcon.svg";
import PhoneIcon from "../image/phoneIcon.svg";
import mapIcon from "../image/mapIcon.svg";
import profileIcon from "../image/profile2.svg";
import addfile from "../image/addfileIcon.svg";
import imagefillteIcon from "../image/imagefillteIcon.svg";

import "../css-pages/RegisterFromPc.css";

const RegisterFormPc = ({ onAuthentication, isPcRequest }) => {
  const [isfullname, setFullname] = useState("");
  const [isdateofbirth, setDateofbirth] = useState("");
  const [isphonenumber, setPhonenumber] = useState("");
  const [iscountry, setCountry] = useState("");
  const [profile, setProfile] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();

    try {
      onAuthentication(
        "registerPc",
        NaN,
        NaN,
        NaN,
        isfullname,
        isdateofbirth,
        isphonenumber,
        iscountry
      );
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0].name;
    setProfile(file);
  };

  return (
    <div>
      <div className="RegisterFormPc-container">
        <div className="Login-header">
          <img src={logoIcon} alt="logo-icon" />
        </div>

        <div className="RegisterFormPc-content-container">
          <div className="RegisterFormPc-content-header">
            <div className="RegisterFormPc-content-header-text">
              <h2>Complete Your Registraion</h2>
              <h4>Project Creater</h4>
            </div>
          </div>

          <div className="RegisterFormPc-main-content">
            <div className="RegisterFormPc-left-content">
              <div className="RegisterFormPc-fullname-form-register">
                <h4>Name</h4>
                <form className="RegisterFormPc-fullname-input-register">
                  <img src={fullnameIcon} alt="user-icon" />
                  <input
                    type="text"
                    value={isfullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Enter your Fullname"
                  />
                </form>
              </div>

              <div className="RegisterFormPc-dateAndPhone-form-register">
                <div className="RegisterFormPc-date-form-register">
                  <h4>Date of Birth</h4>
                  <form className="RegisterFormPc-dateofbirth-input-register">
                    <img src={dateIcon} alt="date-icon" />
                    <input
                      type="date"
                      value={isdateofbirth}
                      onChange={(e) => setDateofbirth(e.target.value)}
                    />
                  </form>
                </div>

                <div className="RegisterFormPc-Phone-form-register">
                  <h4>Phone Number</h4>
                  <form className="RegisterFormPc-phone-input-register">
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

              <div className="RegisterFormPc-mapIcon-form-register">
                <h4>Country</h4>
                <form className="RegisterFormPc-mapIcon-input-register">
                  <img src={mapIcon} alt="user-icon" />

                  <select
                    id="country"
                    onChange={(e) => setCountry(e.target.value)}
                    name="country"
                  >
                    <option value="Canada">Canada</option>
                    <option value="France">France</option>
                    <option value="Taiwan">Taiwan</option>
                    <option selected="selected" value="Thailand">
                      Thailand
                    </option>
                    <option value="United States">United States</option>
                  </select>
                </form>
              </div>
            </div>

            <div className="RegisterFormPc-Right-content">
              <div className="RegisterFormPc-profile">
                <img
                  src={profile || "nopfp.jpg"}
                  alt="profile img"
                  onClick={() => document.getElementById("imageUpload").click()}
                  style={{
                    height: "300px",
                    width: "300px",
                    objectFit: "cover",
                  }}
                ></img>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleProfileUpload(e)}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>

          <div className="RegisterFormPc-bottom">
            <button
              onClick={() => {
                handleSubmit();
                isPcRequest();
              }}
            >
              Register as a Project Creator
            </button>
          </div>
        </div>
      </div>

      {/* <form onSubmit={handleSubmit}> */}
      {/* <input type="text" onChange={(e) => setFullname(e.target.value)} placeholder="Full Name" /> */}

      {/* <input type="date" onChange={(e) => setDateofbirth(e.target.value)} placeholder="Date of Birth" /> */}

      {/* <input type="tel" onChange={(e) => setPhonenumber(e.target.value)} placeholder="Phone Number" /> */}

      {/* <input type="text" onChange={(e) => setCountry(e.target.value)} placeholder="Country" /> */}

      {/* <button onClick={() => { handleSubmit(); }}>submitx</button> */}
      {/* <button onClick={() => { isPcRequest(); }}>submitx</button> */}

      {/* </form> */}
    </div>
  );
};

export default RegisterFormPc;
