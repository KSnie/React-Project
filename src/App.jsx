import React, { useState } from "react";
import "./App.css";
import Header from "./component/Header";
import Home from "./component/pages/Home";
import Myapplications from "./component/pages/Myapplications";
import Calendar from "./component/pages/Calendar";
import Script from "./component/pages/Script";
import Dashboard from "./component/pages/Dashboard";
import Slidebar from "./component/Slidebar";
import AuthPage from "./component/pages/AuthPage"; // Import the AuthPage component
import data from "./component/pages/Data.json";

const pageComponents = {
  Home: Home,
  Myapplications: Myapplications,
  Calendar: Calendar,
  Script: Script,
  Dashboard: Dashboard,
};

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [currentSlide, setCurrentSlide] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [userRole, setUserRole] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSlideToggle = (option) => {
    setCurrentSlide(option);
  };

  const handleAuthentication = (status, username, password) => {
    setIsAuthenticated(status);
    
    if (status) {
      // Check the username and password against the array of users
      const foundUser = data.find(
        (user) => user.username === username && user.password === password
      );
  
      if (foundUser) {
        setUserRole(foundUser.role);
      } else {
        // Default to 'user' role if no matching user is found
        setUserRole('user');
      }
    }
  };

  return (
    <div className="app">
      <div className="container">
        {!isAuthenticated ? (
          <AuthPage onAuthentication={handleAuthentication} data={data} />
        ) : (
          <div>
            <Header userRole={userRole} statusSlide={handleSlideToggle} />
            <div className="Main">
              <Slidebar
                userRole={userRole}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                currentSlide={currentSlide}
              />

              <div
                className={`content ${
                  currentSlide ? "show-content" : "hide-content"
                }`}
              >
                <div className="Box-content">
                  {pageComponents[currentPage] &&
                    React.createElement(pageComponents[currentPage])}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
