import React from "react";
import profile from "../image/profile.svg";
import profile2 from "../image/profile2.svg";
import "../css-pages/cp-post.css";
import optionIcon from "../image/optionIcon.svg"

const Post = () => {
  const PostDetail = [
    {
      Post_id: 1,
      Studio_name: "Marvel Studios",
      Catagory: "Horror",
      userProfile_id: profile,
      Post_Movie_name: "Infinity War",
      Post_Detail:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      Date_casting: "27/12/2023",
      Time_casting: "09.00 - 14.00",
    },

    {
      Post_id: 2,
      Studio_name: "DC Studios",
      Catagory: "LoveStory",
      userProfile_id: profile2,
      Post_Movie_name: "Last Love",
      Post_Detail:"TEST SHORT TEXT",
      Date_casting: "27/12/2023",
      Time_casting: "09.00 - 14.00",
    },

  ];

  return (
    <div>
      {PostDetail.map((post) => (

        <div className="Header-post">
            
            <div className="post-top">
              <div className="user-info-post">
                  <img src={post.userProfile_id} alt="profile"/>
                  <div className="Name-post">
                    <h1>{post.Studio_name}</h1>
                    <p>Category {post.Catagory}</p>
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
                <button onClick={() => console.log(post.Post_id)}>See more detail</button>
              </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
