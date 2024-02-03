import React from "react";
import "./Slidebar.css";
import HomeIcon from "./image/HomeIcon.svg";

const Slidebar = ({ userRole, currentPage, onPageChange,currentSlide}) => {
  return (
    <div className={`slidebar ${currentSlide ? "show" : "hide"}`}>
      <p>MAIN MENU</p>

      {userRole === "admin" && (
        <>
          <div
            className={`page ${currentPage === "Home" ? "active" : ""}`}
            onClick={() => onPageChange("Home")}
          >
            <img src={HomeIcon} alt="HomeIcon" />
            <button>Home</button>
          </div>
          <div
            className={`page ${currentPage === "Dashboard" ? "active" : ""}`}
            onClick={() => onPageChange("Dashboard")}
          >
            <img src={HomeIcon} alt="HomeIcon" />
            <button>Dashboard</button>
          </div>
        </>
      )}

      {userRole === "user" && (
        <>
          {/* Add user-specific pages or navigation here */}
        </>
      )}
    </div>
  );
};

export default Slidebar;
