import React, { useState } from "react";
import "../css-pages/Myproject.css";
import { createPortal } from "react-dom";
import newContactIcon from "../image/newContactIcon.svg";
import humanIcon from "../image/humanIcon.svg";
import noImage from "../image/noImage.svg";

const Myproject = () => {
  const [NewProjectwindow, setNewProjectwindow] = useState(false);

  const MyprojectData = [
    {
      name: "Conjuring",
      category: "Horror",
      date: "2022-12-16",
      img: "/projects/conjuring.jpg",
    },
    {
      name: "Joker",
      category: "Drama",
      date: "2022-12-16",
      img: "/projects/joker.jpg",
    },
    {
      name: "Avengers",
      category: "Action",
      date: "2022-12-16",
      img: "/projects/avengers.jpg",
    },
    {
      name: "Peaky Blinders",
      category: "Historical",
      date: "2022-12-16",
      img: "/projects/peakyblinders.jpg",
    },
    {
      name: "Tarzan",
      category: "Adventure",
      date: "2022-12-16",
      img: "/projects/tarzan.jpg",
    },
  ];

  return (
    <div className="projects-content">
      <div className="projects-header">
        <h2>My Projects</h2>
        <button
          onClick={() => {
            setNewProjectwindow(true);
          }}
        >
          New Project
        </button>
      </div>
      <div className="projects-container">
        {MyprojectData.map((data) => (
          <Project data={data} key={data.name} />
        ))}
      </div>
      <NewProject
        data={{
          name: "",
          category: "",
          img: noImage,
        }}
        isOpened={NewProjectwindow}
        onClose={() => setNewProjectwindow(false)}
      />
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
        <img src={data.img} alt="img-banner"></img>
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
  const managerData = [
    {
      Fname: "Nueachai",
      Lname: "Wijitsopon",
      Username: "xxx",
    },
    {
      Fname: "Kasidis",
      Lname: "Chuayprasert",
      Username: "Nine",
    },
  ];
  const [editedName, setEditedName] = useState(data.name);
  const [editedCategory, setEditedCategory] = useState(data.category);

  if (!isOpened) {
    return null;
  }

  return createPortal(
    <div>
      <div className="overlay">
        <div className="modal">
          <div className="Editproject-Header">
            <img src={data.img} alt="Project Banner"></img>

            <div className="Editproject-name-input">
              <h4>Project Title</h4>
              <input
                className="Editproject-project-title"
                type="text"
                placeholder={data.name}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              ></input>
              <h4>Category</h4>
              <input
                className="Editproject-project-Category"
                type="text"
                placeholder={data.category}
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              ></input>
              <h4>Date</h4>
              <input
                className="Editproject-project-Category"
                type="text"
                placeholder={data.date}
                value={data.date}
                onChange={(e) => setEditedCategory(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="Editproject-manager">
            <div className="manager-header">
              <p>Project Manager</p>
              <button>
                <img src={newContactIcon} alt="newContactIcon"></img>Add
              </button>
            </div>

            <div className="manager-content">
              {managerData.map((manager, index) => (
                <div key={index} className="manager-main-content">
                  <img src={humanIcon} alt=""></img>
                  <h3>
                    {manager.Fname} {manager.Lname}
                  </h3>
                  <h3>{manager.Username}</h3>

                  <button>Remove</button>
                </div>
              ))}
            </div>

            <button
              className="btn-editproject"
              onClick={() => {
                handleName(editedName);
                handleCategory(editedCategory);
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

const NewProject = ({
  data,
  isOpened,
  onClose,
  handleName,
  handleCategory,
}) => {
  const DirectorData = [
    // {
    //   Fname: "Nueachai",
    //   Lname: "Wijitsopon",
    //   Username: "xxx"
    // },
  ];
  const [editedName, setEditedName] = useState(data.name);
  const [editedCategory, setEditedCategory] = useState(data.category);

  if (!isOpened) {
    return null;
  }

  return createPortal(
    <div>
      <div className="overlay">
        <div className="modal">
          <div className="Newproject-Header">
            <img src={data.img} alt="Project Banner"></img>

            <div className="Editproject-name-input">
              <h4>Project Title</h4>
              <input
                className="Editproject-project-title"
                type="text"
                placeholder={data.name}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              ></input>
              <h4>Category</h4>
              <input
                className="Editproject-project-Category"
                type="text"
                placeholder={data.category}
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="Editproject-director">
            <div className="director-header">
              <p>Project Director</p>
              <button>
                <img src={newContactIcon} alt="newContactIcon"></img>Add
              </button>
            </div>

            <div className="director-content">
              {DirectorData.map((director, index) => (
                <div key={index} className="director-main-content">
                  <img src={humanIcon} alt=""></img>
                  <h3>
                    {director.Fname} {director.Lname}
                  </h3>
                  <h3>{director.Username}</h3>

                  <button>Remove</button>
                </div>
              ))}
            </div>

            <button
              className="btn-editproject"
              onClick={() => {
                onClose();
              }}
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Myproject;
