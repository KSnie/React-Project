import React from "react";
import "../css-pages/Myproject.css";
import data from "./projects.json";

const Myproject = () => {
  return (
    <div className="projects-content">
      <div className="projects-header">
        <h2>My Projects</h2>
        <button>New Project</button>
      </div>
      <div className="projects-container">
        {data.map((data) => (
          <Project
            name={data.name}
            category={data.category}
            img={data.img}
            key={data.name}
          />
        ))}
      </div>
    </div>
  );
};

const Project = ({ name, category, img }) => {
  console.log(img);
  return (
    <div className="project">
      <img src={img} alt={name} />
      <div className="project-description">
        <p>
          <strong>{name}</strong>
        </p>
        <span>{category}</span>
      </div>
    </div>
  );
};

export default Myproject;
