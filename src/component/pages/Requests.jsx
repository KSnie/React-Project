import React from "react";
import "../css-pages/Requests.css";
import profile from "../image/profile.svg";

const Requests = () => {

  const requestDetail = [
    {
      Fname: "Kasidis",
      Lname: "Chuayprasert",
      RegisterDate: "2004-02-20",
    },
    {
      Fname: "Kasidis",
      Lname: "Chuayprasert",
      RegisterDate: "2004-02-20",
    },
    {
      Fname: "Kasidis",
      Lname: "Chuayprasert",
      RegisterDate: "2004-02-20",
    },
    {
      Fname: "Kasidis",
      Lname: "Chuayprasert",
      RegisterDate: "2004-02-20",
    },
    {
      Fname: "Kasidis",
      Lname: "Chuayprasert",
      RegisterDate: "2004-02-20",
    },
  ];

  return (
    <div>
      <div className="Request-container">
        <div className="Script-header">
          <h4>Request</h4>
          <p>Project Creater Request</p>
        </div>

          {requestDetail.map((request,index) => (
            <div className="Request-main-content">
              <div className="containter">
                <div className="Request-content">
                  <img src= {profile} alt = {profile}></img>

                  <h3>{request.Fname} {request.Lname}</h3>

                  <div className="Request-date">
                    <h3>Date Register</h3>
                    <h4>{request.RegisterDate}</h4>
                  </div>

                  <div className="btn-request">
                    <button className="btn-request-view">View</button>
                    <button className="btn-request-Accept">Accept</button>
                    <button className="btn-request-Reject">Reject</button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Requests;
