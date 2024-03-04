import React, { useState, useEffect } from "react";
import searchIcon from "../image/searchIcon.svg";
import sortIcon from "../image/sortIcon.svg";
import axios from "axios";
import "../css-pages/Usermanager.css";
import newContactIcon from "../image/newContactIcon.svg";
import { createPortal } from "react-dom";

import profile from "../image/profile.svg";

const User = () => {
  const [editProfileWindow, setEditProfileWindow] = useState(false);
  const [dataSelect, setDataSelect] = useState(null);
  const [newContactWindow, setNewContactWindow] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:3000/admin/getusers");
      setUsersData(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = async () => {
    try {
      const response = await axios.post("http://localhost:3000/admin/getusers");
      setUsersData(response.data);
      fetchData();
    } catch (error) {
      console.error("Error updating users", error);
    }
  };

  const DeleteUser = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/DeleteUser",
        e
      );
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error("Error DeleteUser users", error);
    }
  };

  return (
    <div>
      <div className="UserManager-container">
        <div className="UserManager-Header">
          <div className="Script-header">
            <h2>User</h2>
            <p>Account Manager</p>
          </div>

          <div
            className="UM-new-contact"
            onClick={() => setNewContactWindow(true)}
          >
            <img src={newContactIcon} alt="newcontact-Icon"></img>
            <h4>New Contact</h4>
          </div>
        </div>

        <div className="containter">
          <div className="UM-container-header">
            <h4 className="text-id">ID USER:</h4>
            <h4 className="text-name">Name:</h4>
            <h4 className="text-username">Username:</h4>
            <h4 className="text-role">Role:</h4>
            <div className="text-action">
              <h4>Action:</h4>
            </div>
            <h4 className="text-Remove">Remove:</h4>
          </div>
          {usersData.map((data, index) => (
            <div key={index} className="UM-container-content">
              <div className="User-id">
                <h5>#{data.user_id}</h5>
              </div>

              <div className="User-Name">
                <h5>
                  {data.f_name} {data.l_name}
                </h5>
              </div>

              <div className="User-Username">
                <h5>{data.username}</h5>
              </div>

              <div className="User-role">
                <h5>{data.role}</h5>
              </div>

              <div className="User-view-button">
                <button
                  onClick={() => {
                    setEditProfileWindow(true);
                    setDataSelect(data);
                  }}
                >
                  View
                </button>
              </div>

              <div className="User-Remove-button">
                <button onClick={() => DeleteUser(data)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <EditProfile
          data={dataSelect}
          isOpened={editProfileWindow}
          onClose={() => {
            setEditProfileWindow(false);
          }}
          updateData={updateData()}
        />
        <NewContact
          data={usersData}
          isOpened={newContactWindow}
          onClose={() => setNewContactWindow(false)}
          updateData={updateData()}
        />
      </div>
    </div>
  );
};

const EditProfile = ({ data, isOpened, onClose, updateData }) => {
  const [editdata, seteditdata] = useState({ data });

  if (!isOpened) {
    return null;
  }

  const handleChange = (e) => {
    seteditdata({ ...data, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handlesave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/updateuser",
        editdata
      );
      console.log(response);
      updateData();
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  return createPortal(
    <div>
      <div className="overlay">
        <div className="Usermanager-container">
          <div className="Usermanager-header">
            <img src={profile} alt={profile}></img>

            <div className="Usermanager-Fname-Lname">
              <h3>First Name</h3>
              <input
                type="text"
                placeholder={data.f_name}
                value={editdata.f_name}
                name="f_name"
                onChange={handleChange}
              />
              <h3>Last Name</h3>
              <input
                type="text"
                placeholder={data.l_name}
                value={editdata.l_name}
                name="l_name"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="UserManager-content">
            <h3>Date of birth</h3>
            <input
              type="date"
              placeholder={formatDate(data.date_of_birth)}
              value={formatDate(editdata.date_of_birth)}
              name="date_of_birth"
              onChange={handleChange}
            />
            <h3>Username</h3>
            <input
              type="text"
              placeholder={data.username}
              value={editdata.username}
              name="username"
              onChange={handleChange}
            />
            <h3>password</h3>
            <input
              type="text"
              placeholder={data.password}
              value={editdata.password}
              name="password"
              onChange={handleChange}
            />

            <h3>Role</h3>
            <input
              type="text"
              placeholder={data.role}
              value={editdata.role}
              name="role"
              onChange={handleChange}
            />

            <h3>Gender</h3>
            <input
              type="text"
              placeholder={data.gender}
              value={editdata.gender}
              name="gender"
              onChange={handleChange}
            />

            <h3>Phone number</h3>
            <input
              type="text"
              placeholder={data.phone_number}
              value={editdata.phone_number}
              name="phone_number"
              onChange={handleChange}
            />

            <h3>country</h3>

            <select
              id="country"
              value={editdata.country}
              name="country"
              onChange={handleChange}
            >
              <option value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Thailand">Thailand</option>
              <option value="United States">United States</option>
            </select>
          </div>

          <button
            onClick={() => {
              onClose();
              handlesave();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

const NewContact = ({ isOpened, onClose, updateData }) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    F_name: "",
    L_name: "",
    date_of_birth: "",
    phone_number: "",
    role: "",
    country: "",
    gender: "",
  });

  if (!isOpened) {
    return null;
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/newuser",
        values
      );

      console.log(response);
      updateData();
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  return createPortal(
    <div>
      <div className="overlay">
        <div className="Usermanager-containerx">
          <div className="Usermanager-header">
            <img src={profile} alt={profile}></img>

            <div className="Usermanager-Fname-Lname">
              <h3>First Name</h3>
              <input
                type="text"
                name="F_name"
                value={values.F_name}
                onChange={handleChange}
              />
              <h3>Last Name</h3>
              <input
                type="text"
                name="L_name"
                value={values.L_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="UserManager-content">
            <h3>Date of birth</h3>
            <input
              type="text"
              name="date_of_birth"
              value={values.date_of_birth}
              onChange={handleChange}
            />
            <h3>Username</h3>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
            />
            <h3>password</h3>
            <input
              type="text"
              value={values.password}
              name="password"
              onChange={handleChange}
            />

            <h3>Role</h3>
            <input
              type="text"
              value={values.role}
              name="role"
              onChange={handleChange}
            />

            <h3>Gender</h3>
            <input
              type="text"
              value={values.gender}
              name="gender"
              onChange={handleChange}
            />

            <h3>Phone number</h3>
            <input
              type="text"
              value={values.phone_number}
              name="phone_number"
              onChange={handleChange}
            />

            <h3>country</h3>

            <select
              id="country"
              value={values.country}
              name="country"
              onChange={handleChange}
            >
              <option value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Thailand">Thailand</option>
              <option value="United States">United States</option>
            </select>
          </div>

          <button
            onClick={() => {
              onClose();
              handleSubmit();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default User;
