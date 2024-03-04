import React, { useState, useEffect } from "react";
import "../css-pages/Myproject_PM.css";
import { createPortal } from "react-dom";
import humanIcon from "../image/humanIcon.svg";
import axios from "axios";
import noImage from "../image/noImage.svg";

const Myproject_PM = ({ userData }) => {
  const [managerMyprojectData, setmanagerMyprojectData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/ProjectManager/getmanagermyproject",
          {
            user_id: userData.user_id,
          }
        );
        setmanagerMyprojectData(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchData();
  }, [userData]);

  console.log(managerMyprojectData);

  return (
    <div className="projects-content">
      <div className="projects-header">
        <h2>My Projects</h2>
      </div>
      <div className="projects-container">
        {managerMyprojectData.map((data) => (
          <Project data={data} key={data.manager_id} />
        ))}
      </div>
    </div>
  );
};

const Project = ({ data }) => {
  const [viewProjectWindow, setviewProjectWindow] = useState(false);
  return (
    <>
      <div
        className="project"
        onClick={() => {
          setviewProjectWindow(true);
        }}
      >
        <img src={data.img} alt="img-banner"></img>
        <div className="project-description">
          <p>
            <strong>{data.project_title}</strong>
          </p>
          <span>{data.category}</span>
        </div>
      </div>
      <ViewProject
        data={data}
        isOpened={viewProjectWindow}
        onClose={() => setviewProjectWindow(false)}
      />
    </>
  );
};

const ViewProject = ({ data, isOpened, onClose }) => {
  const [requestData, setRequestData] = useState([]);

  const updateData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/ProjectManager/getrequest",
        {
          project_id: data.project_id,
        }
      );
      console.log(data.project_id);

      setRequestData(response.data);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/ProjectManager/getrequest",
          {
            project_id: data.project_id,
          }
        );
        console.log(data.project_id);

        setRequestData(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchData();
  }, [data]);

  console.log(requestData);

  const accept = async (e) => {
    try {
      await axios.post("http://localhost:3000/ProjectManager/updateStatus", {
        request_id: e.request_id,
        status: "Accepted",
      });
      updateData();
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  const reject = async (e) => {
    try {
      await axios.post("http://localhost:3000/ProjectManager/updateStatus", {
        request_id: e.request_id,
        status: "Declined",
      });
      updateData();
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  if (!isOpened) {
    return null;
  }

  return createPortal(
    <div>
      <div className="overlay">
        <div className="modal">
          <div className="viewproject-Header">
            <img src={data.img} alt="Project Banner"></img>

            <div className="viewproject-detail">
              <p className="name">{data.project_title}</p>
              <p className="category">{data.category}</p>
            </div>
          </div>

          <div className="viewproject-request">
            <div className="request-header">
              <p>Request List</p>
            </div>

            <div className="request-content">
              {requestData
                .filter((request) => request.status === "Pending")
                .map((request, index) => (
                  <div key={index} className="request-main-content">
                    <img src={humanIcon} alt="" />
                    <h3>
                      {request.f_name} {request.l_name}
                    </h3>
                    <h3>{request.project}</h3>
                    <button
                      className="btn-accept"
                      onClick={() => accept(request)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => reject(request)}
                    >
                      Reject
                    </button>
                  </div>
                ))}
            </div>

            <button
              className="btn-viewproject"
              onClick={() => {
                onClose();
              }}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Myproject_PM;
