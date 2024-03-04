import "../css-pages/ScriptManager.css";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import humanIcon from "../image/humanIcon.svg";
import axios from "axios";
import noImage from "../image/noImage.svg";

const ScriptManager = ({ userData }) => {
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

  return (
    <div className="projects-content">
      <div className="projects-header">
        <h2>Script Manager</h2>
      </div>
      <div className="projects-container">
        {managerMyprojectData.map((data) => (
          <Project data={data} key={data.name} userData={userData} />
        ))}
      </div>
    </div>
  );
};

const Project = ({ data, userData }) => {
  const [viewProjectWindow, setViewProjectWindow] = useState(false);
  return (
    <>
      <div
        className="project"
        onClick={() => {
          setViewProjectWindow(true);
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
        onClose={() => setViewProjectWindow(false)}
        userData={userData}
      />
    </>
  );
};

const ViewProject = ({ data, isOpened, onClose, userData }) => {
  const [sendScriptWindow, setSendScriptWindow] = useState(false);
  const [sendScriptData, setSendScriptData] = useState([]);

  const [requestData, setRequestData] = useState([]);

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

  if (!isOpened) {
    return null;
  }

  return createPortal(
    <>
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
                  .filter((request) => request.status === "Accepted")
                  .map((request, index) => (
                    <div key={index} className="request-main-content">
                      <img src={humanIcon} alt=""></img>
                      <h3>
                        {request.f_name} {request.l_name}
                      </h3>
                      <h3>{request.project}</h3>
                      <button
                        className="btn"
                        onClick={() => {
                          setSendScriptWindow(true);
                          setSendScriptData(request);
                        }}
                      >
                        Send Script
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
      </div>
      <SendScript
        data={sendScriptData}
        isOpened={sendScriptWindow}
        onClose={() => setSendScriptWindow(false)}
        userData={userData}
      />
    </>,
    document.getElementById("modal")
  );
};

const SendScript = ({ data, isOpened, onClose, userData }) => {
  const [topic, setTopic] = useState([]);

  const sentScript = async () => {
    try {
      await axios.post("http://localhost:3000/ProjectManager/sentScript", {
        project_id: data.project_id,
        manager_id: userData.user_id,
        user_id: data.user_id,
        topic: topic,
        url_file: "https://",
      });
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div className="sendscript-container">
      <div className="sendscript-content">
        <p>Send Script</p>
        <div className="script-topic">
          <p>Topic</p>
          <input
            type="text"
            placeholder="Enter topic..."
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />
        </div>
        <button className="script-attach">Attach File</button>
      </div>
      <button
        onClick={() => {
          onClose();
          sentScript();
        }}
        className="script-send"
      >
        Send
      </button>
    </div>,
    document.getElementById("modal")
  );
};

export default ScriptManager;
