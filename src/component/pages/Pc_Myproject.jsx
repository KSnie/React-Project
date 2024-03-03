import React, { useState, useEffect } from "react";
import "../css-pages/Myproject.css";
import { createPortal } from "react-dom";
import newContactIcon from "../image/newContactIcon.svg";
import humanIcon from "../image/humanIcon.svg";
import noImage from "../image/noImage.svg";
import axios from "axios";

const Myproject = ({ userData }) => {
  const [NewProjectwindow, setNewProjectwindow] = useState(false);

  const [MyprojectData, setMyprojectData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/ProjectCreator/getAllProjects",
          {
            user_id: userData.user_id,
          }
        );
        setMyprojectData(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchData();
  }, [userData]);

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
          <Project data={data} key={data.project_title} userData={userData} />
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
        userData={userData}
      />
    </div>
  );
};

const Project = ({ data, userData }) => {
  const [editProjectWindow, setEditProjectWindow] = useState(false);
  const [name, setName] = useState(data.project_title);
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
        userData={userData}
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
  userData,
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
  const [editedName, setEditedName] = useState(data.project_title);
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

const NewProject = ({ isOpened, onClose, userData }) => {
  const DirectorData = [
    {
      Fname: "Nueachai",
      Lname: "Wijitsopon",
      Username: "xxx",
    },
  ];

  const [project, setProject] = useState({
    project_title: "",
    category: "",
    date: "",
  });

  if (!isOpened) {
    return null;
  }

  const handleInput = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/ProjectCreator/newproject",
        {
          project_title: project.project_title,
          category: project.category,
          date: project.date,
          user_id: userData.user_id,
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Error fetching project", error);
    }
  };

  return createPortal(
    <div>
      <div className="overlay">
        <div className="modal">
          <div className="Newproject-Header">
            <img src={""} alt="Project Banner"></img>

            <div className="Editproject-name-input">
              <h4>Project Title</h4>
              <input
                className="Editproject-project-title"
                type="text"
                name="project_title"
                value={project.project_title}
                onChange={handleInput}
              ></input>
              <h4>Category</h4>
              <input
                className="Editproject-project-Category"
                type="text"
                name="category"
                value={project.category}
                onChange={handleInput}
              ></input>
              <h4>Date</h4>
              <input
                className="Editproject-project-Category"
                type="text"
                name="date"
                value={project.date}
                onChange={handleInput}
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
              {DirectorData.map((director, index) => (
                <div key={index} className="manager-main-content">
                  <img src={humanIcon} alt=""></img>
                  <h3>
                    {director.Fname} {director.Lname}
                  </h3>
                  <h3>{director.Username}</h3>

                  <button>Remove</button>
                </div>
              ))}
            </div>
          </div>
          <button
            className="btn-editproject"
            onClick={() => {
              onClose();
              handleSubmit();
            }}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Myproject;
