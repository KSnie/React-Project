import React, { useState } from "react";
import searchIcon from "../image/searchIcon.svg";
import sortIcon from "../image/sortIcon.svg";
import Data from "./Data.json";
import "../css-pages/Usermanager.css";
import newContactIcon from "../image/newContactIcon.svg";
import { createPortal } from "react-dom";

import profile from "../image/profile.svg";

const User = () => {
  const [editProfileWindow, setEditProfileWindow] = useState(false);
  const [dataSelect, setDataSelect] = useState(null);
  const [newContactWindow, setNewContactWindow] = useState(false);

  return (
    <div>
      <div className="UserManager-container">
        <div className="UserManager-Header">
          <div className="Script-header">
            <h2>User</h2>
            <p>Account Manager</p>
          </div>

          <div className="UM-app-search">
            <img src={searchIcon} alt="searchIcon" />
            <input type="text" placeholder="Search here" name="search" />
            <button type="select">
              <img src={sortIcon} alt="sortIcon" />
            </button>
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
          {Data.map((data, index) => (
            <div key={index} className="UM-container-content">
              <div className="User-id">
                <h5>#{data.User_id}</h5>
              </div>

              <div className="User-Name">
                <h5>
                  {data.Fname} {data.Lname}
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
                <button>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <EditProfile
          data={dataSelect}
          isOpened={editProfileWindow}
          onClose={() => setEditProfileWindow(false)}
        />
        <NewContact
          data={Data}
          isOpened={newContactWindow}
          onClose={() => setNewContactWindow(false)}
        />
      </div>
    </div>
  );
};

const EditProfile = ({ data, isOpened, onClose }) => {
  if (!isOpened) {
    return null;
  }

  return createPortal(
    <div>
      <div className="overlay">
        <div className="Usermanager-container">
          <div className="Usermanager-header">
            <img src={profile} alt={profile}></img>

            <div className="Usermanager-Fname-Lname">
              <h3>First Name</h3>
              <input type="text" placeholder={data.Fname} value={data.Fname} />
              <h3>Last Name</h3>
              <input type="text" placeholder={data.Lname} value={data.Lname} />
            </div>
          </div>

          <div className="UserManager-content">
            <h3>Date of birth</h3>
            <input type="text" placeholder={data.Dob} value={data.Dob} />
            <h3>Username</h3>
            <input
              type="text"
              placeholder={data.username}
              value={data.username}
            />
            <h3>Role</h3>
            <input type="text" placeholder={data.role} value={data.role} />
          </div>

          <button onClick={() => onClose()}>Save</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

const NewContact = ({ isOpened, onClose, data }) => {
  if (!isOpened) {
    return null;
  }

  return createPortal(
    <div>
      <div className="overlay">
        <div className="Usermanager-containerx">
          <div className="Usermanager-header">
            <img src={profile} alt={profile}></img>

            <div className="Usermanager-Fname-Lname">
              <h3>First Name</h3>
              <input type="text" placeholder={data.Fname} value={data.Fname} />
              <h3>Last Name</h3>
              <input type="text" placeholder={data.Lname} value={data.Lname} />
            </div>
          </div>

          <div className="UserManager-content">
            <h3>Date of birth</h3>
            <input type="text" placeholder={data.Dob} value={data.Dob} />
            <h3>Username</h3>
            <input
              type="text"
              placeholder={data.username}
              value={data.username}
            />
            <h3>Password</h3>
            <input
              type="password"
              placeholder={data.username}
              value={data.username}
            />
            <h3>Role</h3>
            <input type="text" placeholder={data.role} value={data.role} />
          </div>

          <button onClick={() => onClose()}>Create</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default User;
