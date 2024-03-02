import React, { useState } from "react";
import logoIcon from "../image/logo.svg";
import "../css-pages/Registerinfo.css";
import fullnameIcon from "../image/fullnameIcon.svg";
import dateIcon from "../image/dateIcon.svg";
import PhoneIcon from "../image/phoneIcon.svg";
import mapIcon from "../image/mapIcon.svg";
import profileIcon from "../image/Registerbanner.svg";
import { useNavigate } from "react-router-dom";


const Registerinfo = ({ errormessage, onSubmit }) => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    F_name: '',
    L_name: '',
    date_of_birth: '',
    phone_number : '',
    role: 'user',
    country: ''
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFullName = (e) => {
    const fullName = e.target.value;
    const [firstName, lastName] = fullName.split(' ');
  
    setValues({
      ...values,
      F_name: firstName || '',
      L_name: lastName || ''
    });
  };

  const handleSubmit = (e) => {
    onSubmit(values);
    if (Object.values(errormessage).every((error) => error === '')) {
      navigate('/');
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
                    name = 'fullname'
                    onChange={handleChangeFullName}
                    placeholder="Enter your Fullname"
                  />
                </form>
              </div>
              {errormessage.F_name && <p className="text-danger">{errormessage.F_name}</p>}
              {errormessage.L_name && <p className="text-danger">{errormessage.L_name}</p>}

              <div className="Registerinfo-dateAndPhone-form-register">
                <div className="Registerinfo-date-form-register">
                  <h4>Date of Birth</h4>
                  <form className="Registerinfo-dateofbirth-input-register">
                    <img src={dateIcon} alt="date-icon" />
                    <input
                      type="date"
                      value={values.date_of_birth}
                      name = 'date_of_birth'
                      onChange={handleChange}
                    />
                  </form>
                  
                </div>

                <div className="Registerinfo-Phone-form-register">
                  <h4>Phone Number</h4>
                  <form className="Registerinfo-phone-input-register">
                    <img src={PhoneIcon} alt="Phone-icon" />
                    <input
                      type="tel"
                      value={values.phone_number}
                      name = 'phone_number'
                      onChange={handleChange}
                      placeholder="Phone number"
                    />
                  </form>
                </div>
              </div>
              {errormessage.date_of_birth && <p className="text-danger">{errormessage.date_of_birth}</p>}
              {errormessage.phone_number && <p className="text-danger">{errormessage.phone_number}</p>}

              <div className="Registerinfo-mapIcon-form-register">
                <h4>Country</h4>
                <form className="Registerinfo-mapIcon-input-register">
                  <img src={mapIcon} alt="user-icon" />

                    <select id="country" name = 'country' onChange={handleChange}>
                      <option value="Canada">Canada</option>
                      <option value="France">France</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Thailand">Thailand</option>
                      <option value="United States">United States</option>
                  </select>
                </form>
              </div>
              {errormessage.country && <p className="text-danger">{errormessage.country}</p>}


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
    </div>
  );
};

export default Registerinfo;
