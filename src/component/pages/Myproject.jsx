import React, { useState } from "react";
import "../css-pages/Myproject.css";
import { createPortal } from "react-dom";

const Myproject = () => {
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
        <button>New Project</button>
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
  const [editProjectWindow, setEditProjectWindow] = useState(false);
  const [name, setName] = useState(data.name);
  const [category, setCategory] = useState(data.category);

  function handleName(newName) {
    setName(newName);
  }

  function handleCategory(newCategory) {
    setCategory(newCategory);
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
          <span>{category}</span>
        </div>
      </div>
      <EditProject
        data={data}
        isOpened={editProjectWindow}
        onClose={() => setEditProjectWindow(false)}
        handleName={handleName}
        handleCategory={handleCategory}
      />
    </>
  );
};

const EditProject = ({
  data,
  isOpened,
  onClose,
  handleName,
  handleCategory,
}) => {
  const [editedName, setEditedName] = useState(data.name);
  const [editedCategory, setEditedCategory] = useState(data.category);

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
              <img src={data.img} alt={data.name} />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleName(editedName);
                  handleCategory(editedCategory);
                }}
              >
                <input
                  type="text"
                  placeholder={data.name}
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={data.category}
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                />
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
