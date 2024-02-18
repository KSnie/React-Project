import React, { useState } from "react";
import "../css-pages/Myproject.css";
import data from "./projects.json";
import { createPortal } from "react-dom";

const Myproject = () => {
  return (
    <div className="projects-content">
      <div className="projects-header">
        <h2>My Projects</h2>
        <button>New Project</button>
      </div>
      <div className="projects-container">
        {data.map((data) => (
          <Project data={data} key={data.name} />
        ))}
      </div>
    </div>
  );
};

const Project = ({ data }) => {
  const [editProjectWindow, setEditProjectWindow] = useState(false);
  const [name, setName] = useState(data.name);

  function handleName(newName) {
    setName(newName);
  }

  return (
    <>
      <div
        className="project"
        onClick={() => {
          setEditProjectWindow(true);
        }}
      >
        <img src={data.img} alt={name} />
        <div className="project-description">
          <p>
            <strong>{name}</strong>
          </p>
          <span>{data.category}</span>
        </div>
      </div>
      <EditProject
        name={name}
        category={data.category}
        img={data.img}
        isOpened={editProjectWindow}
        onClose={() => setEditProjectWindow(false)}
        handleName={handleName}
      />
    </>
  );
};

const EditProject = ({
  name,
  category,
  img,
  isOpened,
  onClose,
  handleName,
}) => {
  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div>
      <div className="overlay">
        <div className="modal">
          <div>
            <span className="close-button" onClick={onClose}>
              Close
            </span>
            <div className="modal-content">
              <img src={img} alt={name} />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleName(e.target.value);
                }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => e.target.value}
                />
                <input type="text" placeholder="Category" value={category} />
                <button>Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Myproject;
