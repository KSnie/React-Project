import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/pages/A_Header";
import Home from "./component/pages/A_Home";
import Myapplications from "./component/pages/User_Myapplications";
import Calendar from "./component/pages/User_Calendar";
import Script from "./component/pages/User_Script";
import Dashboard from "./component/pages/Admin_Dashboard";
import Slidebar from "./component/pages/A_Slidebar";
import AuthPage from "./component/pages/L_AuthPage"; // Import the AuthPage component
// import data from "./component/pages/Data.json";
import PostPopup from "./component/pages/P_PostPopup";
import ScriptDetail from "./component/pages/User_ScriptDetail";

import Requests from "./component/pages/Admin_Requests";
import User from "./component/pages/Admin_Usermanager";

import Dashboardpc from "./component/pages/Pc_Dashboardpc";
import Myproject from "./component/pages/Pc_Myproject";
import Postpc from "./component/pages/Pc_Postpc";

import Myproject_PM from "./component/pages/Pm_Myproject";
import ScriptManager from "./component/pages/Pm_ScriptManager";

const pageComponents = {
  Home: Home,
  Myapplications: Myapplications,
  Calendar: Calendar,
  Script: Script,
  Dashboard: Dashboard,
  PostPopup: PostPopup,
  ScriptDetail: ScriptDetail,
  Requests: Requests,
  User: User,

  Dashboardpc: Dashboardpc,
  Myproject: Myproject,
  Postpc: Postpc,

  Myproject_PM: Myproject_PM,
  ScriptManager: ScriptManager,
};

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [currentSlide, setCurrentSlide] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);
  const [selectScript, setScript] = useState(null);

  const [data, setData] = useState({});
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const PostChange = (post) => {
    setSelectedPost(post);
  };

  const handleSlideToggle = (option) => {
    setCurrentSlide(option);
  };

  const ScriptChange = (script) => {
    setScript(script);
  };

  const handleAuthentication = (data) => {
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      if (data.username && data.role !== "request") {
        setUserName(data.username);
        setUserRole(data.role);
        setIsAuthenticated(true);
      }
    }
  }, [data]);

  const logout = () => {
    setIsAuthenticated(false);
    setData(null);
  };

  return (
    <div className="app">
      <div className="container">
        {!isAuthenticated ? (
          <AuthPage onAuthentication={handleAuthentication} />
        ) : (
          <div>
            <Header
              userRole={userRole}
              userName={userName}
              profile={data.profile}
              statusSlide={handleSlideToggle}
              currentPage={currentPage}
              logout={logout}
            />
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
                      onChangeScript: ScriptChange,
                      scriptDetails: selectScript,
                      userData: data,
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
