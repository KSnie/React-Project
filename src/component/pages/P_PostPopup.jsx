import React, { useState } from "react";
import attachIcon from "../image/attachIcon.svg";
import "../css-pages/PostPopup.css";

const PostPopup = ({ onPageChange , dataPost }) => {

  const [currentCharacter, setCurrentCharacter] = useState("");

  const onRegister = (data) => {
    console.log(data.Post_id)
    console.log(currentCharacter)
  }
  
  return (
    <div>
      <div className="containter">
        <div className="Post-header">
          <img src={dataPost.userProfile_id} alt="profile" />
          <div className="Post-header-name">
            <h3>{dataPost.Studio_name}</h3>
            <p>Category {dataPost.Category}</p>
          </div>
        </div>

        <div className="Post-content-container">
          <div className="Post-left-content">
            {dataPost.Post_Detail}
          </div>

          <div className="Post-right-content">
            <div className="Post-right-main-content">
              <div className="Post-right-top-content">
                <div className="Post-right-moviename">
                  <h4>{dataPost.Post_Movie_name}</h4>
                </div>

                <div className="Post-character">
                  <h4>Character</h4>
                  <select id="postCharacter" name="postCharacter" onChange={(e) => setCurrentCharacter(e.target.value)}>
                    {dataPost.Post_character.map((character, index) => (
                      <option key={index} value={character}>
                        {character}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="Post-Attach-container">
                  <h4>Portfolio (PDF file)</h4>
                  <button className="Post-right-Attach">
                    <img src={attachIcon} alt="Attach Icon"></img>
                    <h5>Attach File</h5>
                  </button>
                </div>
              </div>

              <div className="Post-right-date-time">
                <div className="Post-right-date">
                  <h4>Date Casting</h4>
                  <p>{dataPost.Date_casting}</p>
                </div>

                <div className="Post-right-date">
                  <h4>Time Casting</h4>
                  <p>{dataPost.Time_casting}</p>
                </div>

              </div>
              <div className="Post-submit-button">
                  <button onClick={() => { onPageChange("Home"); onRegister(dataPost);}} >Register</button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPopup;
