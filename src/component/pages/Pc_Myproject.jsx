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

  const dataChangeUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/ProjectCreator/getAllProjects",
        {
          user_id: userData.user_id,
        }
      );
      setMyprojectData(response.data);
    } catch (error) {
      console.error("Error updating projects", error);
    }
  };

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
        <button onClick={() => setNewProjectwindow(true)}>New Project</button>
      </div>
      <div className="projects-container">
        {MyprojectData.map((data) => (
          <Project data={data} key={data.project_id} userData={userData} />
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
        updatedata={dataChangeUpdate} // Pass the function reference without calling it
      />
    </div>
  );
};

const Project = ({ data, userData }) => {
  const [editProjectWindow, setEditProjectWindow] = useState(false);
  const [name, setName] = useState(data.project_title);
  const [category, setCategory] = useState(data.category);
  const [date, setDate] = useState(data.date);

  function handleName(newName) {
    setName(newName);
  }

  function handleCategory(newCategory) {
    setCategory(newCategory);
  }

  function handleDate(newDate) {
    setDate(newDate);
  }

  return (
    <>
      <div
        className="project"
        onClick={() => {
          setEditProjectWindow(true);
        }}
      >
        <img src={noImage} alt="img-banner"></img>
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
        handleDate={handleDate}
        userData={userData}
        name={name}
        category={category}
        date={date}
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
  handleDate,
  name,
  category,
  date,
  userData,
}) => {
  const [managerData, setManagerData] = useState([]);

  const dataChangeUpdate_manager = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/ProjectCreator/getmanager",
        {
          project_id: data.project_id,
        }
      );
      setManagerData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/ProjectCreator/getmanager",
          {
            project_id: data.project_id,
          }
        );
        setManagerData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchData();
  }, [data]);

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/ProjectCreator/updateproject",
        {
          project_title: name,
          category: category,
          date: date,
          project_id: data.project_id,
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteManager = async (managerId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/ProjectCreator/deletemanager",
        {
          manager_id: managerId,
        }
      );

      setManagerData((prevManagerData) =>
        prevManagerData.filter((manager) => manager.manager_id !== managerId)
      );

      console.log(response);
    } catch (error) {
      console.error("Error deleting manager", error);
    }
  };

  const [managerUsername, setManagerUsername] = useState('')

  const Addmanager = async(e) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/ProjectCreator/addManager",
        {
          project_id: data.project_id,
          userName: e
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

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
                placeholder={name}
                value={name}
                onChange={(e) => handleName(e.target.value)}
              ></input>
              <h4>Category</h4>
              <input
                className="Editproject-project-Category"
                type="text"
                placeholder={category}
                value={category}
                onChange={(e) => handleCategory(e.target.value)}
              ></input>
              <h4>Date</h4>
              <input
                className="Editproject-project-Category"
                type="text"
                placeholder={date}
                value={date}
                onChange={(e) => handleDate(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="Editproject-manager">
            <div className="manager-header">
              <p>Project Manager</p>
              <input
                type="text"
                className="Editproject-project-Category"
                style={{ width: 200, marginLeft: "auto", marginRight: "10px" }}
                placeholder="manager username"
                onChange={(e) => setManagerUsername(e.target.value)}
              />
              <button onClick={async () => {
                await Addmanager(managerUsername);
                dataChangeUpdate_manager();
              }}>
                <img src={newContactIcon} alt="newContactIcon" />
                Add
              </button>
            </div>

            <div className="manager-content">
              {managerData.map((manager, index) => (
                <div key={index} className="manager-main-content">
                  <img src={humanIcon} alt=""></img>
                  <h3>
                    {manager.f_name} {manager.l_name}
                  </h3>
                  <h3>{manager.username}</h3>

                  <button
                    onClick={() => handleDeleteManager(manager.manager_id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <button
              className="btn-editproject"
              onClick={() => {
                handleName(name);
                handleCategory(category);
                handleDate(date);
                handleSave();
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

const NewProject = ({ isOpened, onClose, userData , updatedata}) => {
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
      updatedata();
      console.log(response);
    } catch (error) {
      console.error("Error fetching project", error);
    }
  };

  return createPortal(
    <div>
      <div className="overlay">
        <div className="modal" style={{ height: "500px", padding: "20px" }}>
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
          <div
            className="Editproject-manager"
            style={{
              fontSize: "20px",
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "50px",
              fontWeight: "bold",
            }}
          >
            You can add project manager after creating project
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