import React, { useState } from "react";
import "./App.css";
import Header from "./component/Header";
import Home from "./component/pages/Home";
import Dashboard from "./component/pages/Dashboard";
import Slidebar from "./component/Slidebar";

const pageComponents = {
  Home: Home,
  Dashboard: Dashboard,
};

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [currentSlide, setCurrtenSlide] = useState(false);
  const userRole = "admin";

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSlideToggle = (option) => {
    setCurrtenSlide(option);
  };

  return (
    <div className="app">
      <div className="container">
        <Header userRole={userRole} statusSlide={handleSlideToggle} />

        <div className="Main">
          <Slidebar
            userRole={userRole}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            currentSlide={currentSlide}
          />

          <div className={`content ${currentSlide ? 'show-content' : 'hide-content'}`}>
            <div className="Box-content">
              {pageComponents[currentPage] && React.createElement(pageComponents[currentPage])}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
