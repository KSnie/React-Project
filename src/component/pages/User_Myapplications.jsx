import React, { useState, useEffect } from "react";
import profile from "../image/profile.svg";
import "../css-pages/Myapplications.css";
import axios from "axios";

const Myapplications = ({ userData }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/application/getData", { user_id: userData.user_id });
        setApplications(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [userData.user_id]);

  const DeleteRequest = async (e) => {
    try {
      await axios.post("http://localhost:3000/application/delete", { e });

      setApplications(prevApplications => prevApplications.filter(app => app.request_id !== e));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }
  
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
        {applications.map((progess) => (
          <div className="progress-content" key={progess.PostID}>
            <img src={profile} alt="profile" className="profile" />

            <div className="studio-info">
              <h3>
                {progess.f_name} {progess.l_name}
              </h3>
              <p>Category {progess.category}</p>
            </div>

            <div className={`status ${progess.status}`}>
              <h4>{progess.status}</h4>
            </div>

            {progess.status === "Pending" && (
              <button
                className="delete-button-application"
                onClick={() => {
                  DeleteRequest(progess.request_id);
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myapplications;
