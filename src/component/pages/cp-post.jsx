import React, { useState } from "react";
import profile from "../image/profile.svg";
import profile2 from "../image/profile2.svg";
import "../css-pages/cp-post.css";
import optionIcon from "../image/optionIcon.svg"

const Post = ({ onPageChange, onChangePost}) => {

  const PostDetail = [
    {
      Post_id: 1,
      Studio_name: "Marvel Studios",
      Category: "Horror",
      userProfile_id: profile,
      Post_Movie_name: "Infinity War",
      Post_Detail:
        <div>
          <h2>Requirement</h2>
          <ul>
            <p>- XXXXX</p>
            <p>- XXXXX</p>
            <p>- XXXXX</p>
          </ul>

          <h2>Detail</h2>
          <p>Text Test</p>
        </div>,
      Date_casting: "27/12/2023",
      Time_casting: "09.00 - 14.00",

      Post_character : ["First","Second","Third"]
    },

    {
      Post_id: 2,
      Studio_name: "DC Studios",
      Category: "LoveStory",
      userProfile_id: profile2,
      Post_Movie_name: "Last Love",
      Post_Detail:"TEST SHORT TEXT",
      Date_casting: "27/12/2023",
      Time_casting: "09.00 - 14.00",

      Post_character : ["First","Second","Third"]
    },

    {
      Post_id: 3,
      Studio_name: "Nine Studios",
      Category: "LoveStory",
      userProfile_id: profile2,
      Post_Movie_name: "Last Love",
      Post_Detail:"TEST SHORT TEXT",
      Date_casting: "27/12/2023",
      Time_casting: "09.00 - 14.00",

      Post_character : ["First","Second","Third"]
    },

    {
      Post_id: 4,
      Studio_name: "Nine Studios",
      Category: "LoveStory",
      userProfile_id: profile2,
      Post_Movie_name: "Last Love",
      Post_Detail:"TEST SHORT TEXT",
      Date_casting: "27/12/2023",
      Time_casting: "09.00 - 14.00",

      Post_character : ["First","Second","Third"]
    },

    {
      Post_id: 5,
      Studio_name: "Nine Studios",
      Category: "LoveStory",
      userProfile_id: profile2,
      Post_Movie_name: "Last Love",
      Post_Detail:"TEST SHORT TEXT",
      Date_casting: "27/12/2023",
      Time_casting: "09.00 - 14.00",

      Post_character : ["First","Second","Third"]
    },
  ];

  return (
    <div>
      {PostDetail.map((post) => (

        <div key={post.Post_id} className="Header-post">
            
            <div className="post-top">
              <div className="user-info-post">
                  <img src={post.userProfile_id} alt="profile"/>
                  <div className="Name-post">
                    <h1>{post.Studio_name}</h1>
                    <p>Category {post.Category}</p>
                  </div>
              </div>
              
              <div className="option">
                <button>
                  <img src={optionIcon} alt="optionIcon" />
                </button>
              </div>
            </div>

            <div className="post-detail">
              <div className="Post-text">
                <p>{post.Post_Detail}</p>
              </div>
            </div>
            <div className="bottom-post">
            <button onClick={() => { onPageChange("PostPopup"); onChangePost(post)}}>
              See more detail
            </button>
            </div>

        </div>
        
      ))}
    </div>
  );
};

export default Post;
