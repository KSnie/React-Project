import React from "react";
import profile from "../image/profile.svg";
import "../css-pages/Myapplications.css";

const Myapplications = () => {
  const progessDetail = [
    {
      namestudio: "Marvel Studio",
      category: "Hornor",
      Status:"Pending",
      PostID:1234,
    },
    {
      namestudio: "Marvel Studio",
      category: "Hornor",
      Status:"Declined",
      PostID:15,
    },
    {
      namestudio: "Marvel Studio",
      category: "Hornor",
      Status:"Accepted",
      PostID:16,
    },
    {
      namestudio: "DC Studio",
      category: "Hornor",
      Status:"Declined",
      PostID:16,
    }
  ]
  return (
    <div>
      <div className="progress-header">
        <h1>My Applications</h1>
        <p>Overview Page</p>
      </div>
      <div className="progress-container">
        <div className="container-bar">
          <h3>Studio & Projects</h3>
          <h4>Status</h4>
        </div>
        {progessDetail.map((progess) => (
          <div className="progress-content">
            <img src={profile} alt="profile" className="profile"/>

            <div className="studio-info">
              <h3>{progess.namestudio}</h3>
              <p>Category {progess.category}</p>
            </div>

            <div className={`status ${progess.Status}`}>
              <h4>{progess.Status}</h4>
            </div>

            <button className="view-button" onClick={() => {console.log(progess.PostID)}}>
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myapplications;
