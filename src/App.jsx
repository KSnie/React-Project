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
import PostPopup from "./component/pages/PostPopup";

const pageComponents = {
  Home: Home,
  Myapplications: Myapplications,
  Calendar: Calendar,
  Script: Script,
  Dashboard: Dashboard,
  PostPopup : PostPopup
};

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [currentSlide, setCurrentSlide] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const PostChange = (post) => {
    setSelectedPost(post);
    // console.log(post)
  };

  const handleSlideToggle = (option) => {
    setCurrentSlide(option);
  };

  const handleAuthentication = (status, username, password ,gender, fullname,dateofbirth,phonenumber,county,detaillink) => {

    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Gender:", gender);
    console.log("Fullname:", fullname);
    console.log("Date of Birth:", dateofbirth);
    console.log("Phone Number:", phonenumber);
    console.log("County:", county);
    console.log("Detail Link:", detaillink);

    setIsAuthenticated(status);
    
    if (status) {
      const foundUser = data.find(
        (user) => user.username === username && user.password === password
      );
  
      if (foundUser) {
        setUserRole(foundUser.role);
        setUserName(foundUser.username);

      } else {
        setUserName(username);
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
            <Header userRole={userRole} userName={userName} statusSlide={handleSlideToggle} />
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
                  React.createElement(pageComponents[currentPage], {
                    onPageChange: handlePageChange,
                    dataPost: selectedPost,
                    onChangePost: PostChange, 
                  })}
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
