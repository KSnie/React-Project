import React, { useState, useEffect } from "react";
import ProfileIcon from "../image/profile.svg";
import "../css-pages/Script.css";
import axios from "axios";

const Script = ({onPageChange, onChangeScript, userData }) => {

  const [scriptData, setScriptData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.post(
          "http://localhost:3000/user/getscript",
          {
            user_id: userData.user_id,
          }
        );

        setScriptData(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchData();
  }, [userData]);

  const calculateDaysDifference = (castingDate) => {
    const currentDate = new Date();
    const castDate = new Date(castingDate);
    const timeDifference = castDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  return (
    <div>
      <div className="Script-container">
        <div className="Script-header">
          <h4>Your Script</h4>
          <p>Script</p>
        </div>

        <div className="Script-main-content">

          <div className="Script-main-name">
            {scriptData.map((script, index) => (
              <div key={index} className="Script-main-container">
                <img src={ProfileIcon} alt="profileIcon" />

                <div className="Script-content-name">
                  <h5>{script.topic}</h5>
                  <p>Sent from {script.f_name} {script.l_name}</p>
                </div>

                <div className="Script-content-date">
                  <h5>Casting Date</h5>
                  <p>{script.date}</p>
                </div>
                {console.log(calculateDaysDifference(script.date))}

                {calculateDaysDifference(script.date) === 1 ? (
                  <div className="Date-Tomorrow">
                    <h4>Tomorrow</h4>
                  </div>
                ) : calculateDaysDifference(script.date) === 0 ? (
                  <div className="Date-Today">
                    <h4>Today</h4>
                  </div>
                ) : (
                  <div className="not-close"></div>
                )}

                <button className="Script-button" onClick={() => {onPageChange("ScriptDetail"); onChangeScript(script);}}>View</button>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Script;
