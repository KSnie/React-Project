import React, { useState } from "react";
import "../css-pages/Myproject_PM.css";
import { createPortal } from "react-dom";
import humanIcon from "../image/humanIcon.svg";

const Myproject_PM = () => {
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
        <h2>My Projects</h2>
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
            <strong>{data.name}</strong>
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
                  <button className="btn-accept">Accept</button>
                  <button className="btn-reject">Reject</button>
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
