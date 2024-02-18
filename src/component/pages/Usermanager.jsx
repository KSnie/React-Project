import React, { useState } from "react";
import searchIcon from "../image/searchIcon.svg";
import sortIcon from "../image/sortIcon.svg";
import Data from "./Data.json";
import "../css-pages/Usermanager.css";
import newContactIcon from "../image/newContactIcon.svg";
import { createPortal } from "react-dom";

const User = () => {
  const [editProfileWindow, setEditProfileWindow] = useState(false);

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

          <div className="UM-new-contact">
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
          {Data.map((data , index) =>(
            <div key={index} className="UM-container-content">
              <div className="User-id">
                <h5>#{data.User_id}</h5>
              </div>

              <div className="User-Name">
                <h5>{data.Fname} {data.Lname}</h5>
              </div>

              <div className="User-Username">
                <h5>{data.username}</h5>
              </div>

              <div className="User-role">
                <h5>{data.role}</h5>
              </div>

              <div className="User-view-button">
                <button>View</button>
              </div>

              <div className="User-Remove-button">
                <button>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <EditProfile isOpened={editProfileWindow} onClose={() => setEditProfileWindow(false)}/>
      </div>
    </div>
  );
};

const EditProfile = ({isOpened}) => {

  if (!isOpened) {
    return null;
  }

  return createPortal(
    <div>
      <div className="overlay">
        <div className="modal">

        </div>
      </div>
    </div>,
    document.getElementById("modal")
  )
}

export default User;
