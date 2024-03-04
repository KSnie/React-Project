import React, { useState } from "react";
import "../css-pages/Header.css";
import logo from "../image/logo.svg";
import profile from "../image/profile.svg";
import searchIcon from "../image/searchIcon.svg";
import sortIcon from "../image/sortIcon.svg";
import settingIcon from "../image/settingIcon.svg";
import sidebarIcon from "../image/sidebarIcon.svg";

function Header({ userRole, userName, statusSlide, currentPage, logout }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    statusSlide(isSidebarVisible);
  };

  return (
    <div className="app">
      <nav>
        <div className="app-nav-logo">
          <img className="app-logo-img" src={logo} alt="Logo" />
          <button onClick={toggleSidebar}>
            <img src={sidebarIcon} alt="sidebar" />
          </button>
        </div>

        <div className="app-profile">
          <img className="app-profile-img" src={profile} alt="Profile" />
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
  );
}

export default Header;
