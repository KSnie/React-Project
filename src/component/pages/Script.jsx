import React from "react";
import ProfileIcon from "../image/profile.svg";
import "../css-pages/Script.css";

const Script = ({onPageChange, onChangeScript}) => {
  const scriptDetail = [
    {
      name: "Snow White Part #1",
      sent_from: "Sent from Wichita, Kansas.",
      character: "Wicked Queen",
      Casting_Date: "2024-2-15"
    },
    {
      name: "Snow White Part #2",
      sent_from: "Sent from Wichita, Kansas.",
      character: "Wicked Queen",
      Casting_Date: "2024-2-16"
    },
    {
      name: "Snow White Part #3",
      sent_from: "Sent from Wichita, Kansas.",
      character: "Wicked Queen",
      Casting_Date: "2024-2-20"
    },
  ];

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
            {scriptDetail.map((script, index) => (
              <div key={index} className="Script-main-container">
                <img src={ProfileIcon} alt="profileIcon" />

                <div className="Script-content-name">
                  <h5>{script.name}</h5>
                  <p>Sent from {script.sent_from}</p>
                </div>
                
                <div className="Script-content-character">
                  <h5>Character</h5>
                  <p>{script.character}</p>
                </div>

                <div className="Script-content-date">
                  <h5>Casting Date</h5>
                  <p>{script.Casting_Date}</p>
                </div>

                {calculateDaysDifference(script.Casting_Date) === 2 ? (
                  <div className="Date-Tomorrow">
                    <h4>Tomorrow</h4>
                  </div>
                ) : calculateDaysDifference(script.Casting_Date) === 1 ? (
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
