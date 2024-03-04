import React, { useState, useEffect } from "react";
import "../css-pages/Header.css";
import logo from "../image/logo.svg";
import axios from "axios";
import profile from "../image/profile.svg";
import sidebarIcon from "../image/sidebarIcon.svg";
import { createPortal } from "react-dom";

function Header({
  userRole,
  userName,
  statusSlide,
  currentPage,
  logout,
  userData,
}) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isEditProfileOpen, setisEditProfileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    statusSlide(isSidebarVisible);
  };

  return (
    <>
      <div className="app">
        <nav>
          <div className="app-nav-logo">
            <img className="app-logo-img" src={logo} alt="Logo" />
            <button onClick={toggleSidebar}>
              <img src={sidebarIcon} alt="sidebar" />
            </button>
          </div>

          <div className="app-profile">
            <img
              className="app-profile-img"
              src={profile}
              alt="Profile"
              onClick={() => setisEditProfileOpen(true)}
              style={{ cursor: "pointer" }}
            />
            <div className="app-profile-info">
              <h3>{userName}</h3>
              <p>{userRole}</p>
            </div>

            <button
              className="button-logout"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
      <EditProfile
        userData={userData}
        isEditProfileOpen={isEditProfileOpen}
        onClose={() => setisEditProfileOpen(false)}
      />
    </>
  );
}

const EditProfile = ({ userData, isEditProfileOpen, onClose }) => {
  if (!isEditProfileOpen) {
    return null;
  }

  return createPortal(
    <div>
      <div className="overlay">
        <div className="modal">
          <img src="" alt="" />
          <form action="">
            <input type="text" />
            <input type="text" />
          </form>
          <span onClick={() => onClose()} style={{ cursor: "pointer" }}>
            Close
          </span>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Header;
