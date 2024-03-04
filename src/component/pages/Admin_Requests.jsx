import React, { useState, useEffect } from "react";
import "../css-pages/Requests.css";
import profile from "../image/profile.svg";
import axios from "axios";

const Requests = () => {
  const [requestData, setRequestData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/getAllRequestDataWithUser"
      );
      setRequestData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const accept_projectcreater = async (user) => {
    try {
      await axios.post("http://localhost:3000/admin/acceptProjectCreator", {
        user,
      });
      fetchData();
    } catch (error) {
      console.error("Error accepting project creator:", error);
    }
  };

  const reject_projectcreater = async (user) => {
    try {
      await axios.post("http://localhost:3000/admin/rejectProjectCreator", {
        user,
      });
      fetchData();
    } catch (error) {
      console.error("Error rejecting project creator:", error);
    }
  };

  return (
    <div>
      <div className="Request-container">
        <div className="Script-header">
          <h4>Request</h4>
          <p>Project Creater Request</p>
        </div>

        {requestData.map((request, index) => (
          <div className="Request-main-content">
            <div className="containter">
              <div className="Request-content">
                <img src={profile} alt={profile}></img>

                <h3>
                  {request.f_name} {request.l_name}
                </h3>

                <div className="Request-date">
                  <h3>Date Register</h3>
                  <h4>{request.register_date}</h4>
                </div>

                <div className="btn-request">
                  {/* <button className="btn-request-view">View</button> */}
                  <button
                    className="btn-request-Accept"
                    onClick={() => accept_projectcreater(request)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn-request-Reject"
                    onClick={() => reject_projectcreater(request)}
                  >
                    Reject
                  </button>
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
