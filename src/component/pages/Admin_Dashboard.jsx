import React from "react";
import profile from "../image/profile.svg";
import profile2 from "../image/profile2.svg";
import "../css-pages/Dashboard.css";

const Dashboard = () => {


  const DashboardDetail = [
    {
      userProfile_id: profile,
      nameStudio: "Marvel Studios1",
      category: "Horror",
      viewer: "500",
      Register: "100"
    },
    {
      userProfile_id: profile,
      nameStudio: "Marvel Studios2",
      category: "Horror",
      viewer: "500",
      Register: "100"
    },
    {
      userProfile_id: profile2,
      nameStudio: "Marvel Studios3",
      category: "Horror",
      viewer: "500",
      Register: "100"
    },
    {
      userProfile_id: profile2,
      nameStudio: "Marvel Studios3",
      category: "Horror",
      viewer: "500",
      Register: "100"
    },
    {
      userProfile_id: profile2,
      nameStudio: "Marvel Studios3",
      category: "Horror",
      viewer: "500",
      Register: "100"
    },
  ];

  return (
    <div>
      <div className="Dashboard-container">
        <div className="Script-header">
          <h4>Dashboard</h4>
          <p>Overview Page</p>
        </div>

        <div className="Dashboard-summary-content">
          <div className="dashboard-user">
            <h4>User</h4>
            <h2>1024</h2>
          </div>
          <div className="dashboard-Viewer">
            <h4>Viewer</h4>
            <h2>9400</h2>
          </div>
          <div className="dashboard-Register">
            <h4>Today Register</h4>
            <h2>180</h2>
          </div>
        </div>

        <div className="Dashboard-main-content">
          <div className="containter">
            <h5 className="Dashboard-text">Today's trends</h5>
            {DashboardDetail.map((dashboard, index) => (
              <div key = {index} className="Dashboard-main-container">
                <img src={dashboard.userProfile_id} alt="Profile"></img>

                <div className="Dashboard-content-name">
                  <h5>{dashboard.nameStudio}</h5>
                  <p>Category {dashboard.category}</p>
                </div>

                <div className="Dashboard-content-Viewer">
                  <h5>Viewer</h5>
                  <p>{dashboard.viewer}</p>
                </div>

                <div className="Dashboard-content-Register">
                  <h5>Register</h5>
                  <p>{dashboard.Register}</p>
                </div>

                <button className="Dashboard-button-View">View</button>
                <button className="Dashboard-button-Delete">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
