import "../css-pages/ScriptManager.css";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import humanIcon from "../image/humanIcon.svg";

const ScriptManager = () => {
  const MyprojectData = [
    {
      name: "Conjuring",
      category: "Horror",
      img: "/projects/conjuring.jpg",
    },
    {
      name: "Joker",
      category: "Drama",
      img: "/projects/joker.jpg",
    },
    {
      name: "Avengers",
      category: "Action",
      img: "/projects/avengers.jpg",
    },
    {
      name: "Peaky Blinders",
      category: "Historical",
      img: "/projects/peakyblinders.jpg",
    },
    {
      name: "Tarzan",
      category: "Adventure",
      img: "/projects/tarzan.jpg",
    },
  ];

  return (
    <div className="projects-content">
      <div className="projects-header">
        <h2>Script Manager</h2>
      </div>
      <div className="projects-container">
        {MyprojectData.map((data) => (
          <Project data={data} key={data.name} />
        ))}
      </div>
    </div>
  );
};

const Project = ({ data }) => {
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
            <strong>{data.name}</strong>
          </p>
          <span>{data.category}</span>
        </div>
      </div>
      <ViewProject
        data={data}
        isOpened={viewProjectWindow}
        onClose={() => setViewProjectWindow(false)}
      />
    </>
  );
};

const ViewProject = ({ data, isOpened, onClose }) => {
  const [sendScriptWindow, setSendScriptWindow] = useState(false);

  const requestData = [
    {
      Fname: "Nanthanat",
      Lname: "Ounma",
      project: "Avengers",
    },
    {
      Fname: "Bhurichaya",
      Lname: "Thuraphan",
      project: "John Wick",
    },
  ];

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
                <p className="name">{data.name}</p>
                <p className="category">{data.category}</p>
              </div>
            </div>

            <div className="viewproject-request">
              <div className="request-header">
                <p>Request List</p>
              </div>

              <div className="request-content">
                {requestData.map((request, index) => (
                  <div key={index} className="request-main-content">
                    <img src={humanIcon} alt=""></img>
                    <h3>
                      {request.Fname} {request.Lname}
                    </h3>
                    <h3>{request.project}</h3>
                    <button
                      className="btn"
                      onClick={() => {
                        setSendScriptWindow(true);
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
        data={data}
        isOpened={sendScriptWindow}
        onClose={() => setSendScriptWindow(false)}
      />
    </>,
    document.getElementById("modal")
  );
};

const SendScript = ({ isOpened, onClose, requestData }) => {
  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div className="sendscript-container">
      <div className="sendscript-content">
        <p>Send Script</p>
        <div className="script-topic">
          <p>Topic</p>
          <input type="text" placeholder="Enter topic..." />
        </div>
        <button className="script-attach">Attach File</button>
      </div>
      <button onClick={onClose} className="script-send">
        Send
      </button>
    </div>,
    document.getElementById("modal")
  );
};

export default ScriptManager;
