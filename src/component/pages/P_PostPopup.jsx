import React from "react";
import attachIcon from "../image/attachIcon.svg";
import "../css-pages/PostPopup.css";
import profile from "../image/profile.svg";
import axios from "axios";

const PostPopup = ({ onPageChange , dataPost , userData }) => {

  const onRegister = async (e) => {
    console.log(e.project_id);
    console.log(userData.user_id);
    try {
      const res = await axios.post('http://localhost:3000/post/submitpost', {
        project_id: e.project_id,
        user_id: userData.user_id,
        status: "Pending",
      });
      console.log(res.data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }

  return (
    <div>
      <div className="containter">
        <div className="Post-header">
          <img src={profile} alt="profile" />
          <div className="Post-header-name">
            <h3>{dataPost.f_name} {dataPost.l_name}</h3>
            <p>Category {dataPost.category}</p>
          </div>
        </div>

        <div className="Post-content-container">
          <div className="Post-left-content">
            {dataPost.post_details}
          </div>

          <div className="Post-right-content">
            <div className="Post-right-main-content">
              <div className="Post-right-top-content">
                <div className="Post-right-moviename">
                  <h4>{dataPost.project_title}</h4>
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
                  <p>{dataPost.date}</p>
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
