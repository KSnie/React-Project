import React, { useState } from "react";
import "../css-pages/Postpc.css";
import { createPortal } from "react-dom";


const Postpc = () => {
  const postData = [
    {
      name: "Conjuring",
      category: "Horror",
      project: "Conjuring",
      views: 69,
      Date_cast: "27/12/2023  9.00 - 12.00",
      application: 69,
      PostID: 1,
    },
    {
      name: "Romeo and Juliet",
      category: "Romantic",
      project: "Romeo",
      views: 96,
      Date_cast: "27/12/2023  9.00 - 12.00",
      application: 96,
      PostID: 2,
    },
    {
      name: "Luang Pee Jas 5G",
      category: "Comedy",
      project: "Luang",
      views: 555,
      Date_cast: "27/12/2023  9.00 - 12.00",
      application: 123,
      PostID: 3,
    },
  ];

  const [EditNewPostwindow, setEditNewPostwindow] = useState(false);

  return (
    <div className="post-main">
      <div className="post-header">
        <h2>Posts</h2>
        <button onClick={() => {setEditNewPostwindow(true);}}>New Post</button>
      </div>
      <div className="posts-container">
        {postData.map((post) => (
          <Post post={post} key={post.PostID} />
        ))}
      </div>
      <NewEditPost Data={    {
      name: "",
      category: "",
      project: "",
      views: 0,
      application: 0,
      PostID: 2,
    }} isOpened={EditNewPostwindow} onClose={() => {setEditNewPostwindow(false);}}></NewEditPost>
    </div>
  );
};

const Post = ({ post }) => {

  const [EditNewPostwindow, setEditNewPostwindow] = useState(false);


  return (
    <div className="post">
      <div className="detail">
        <p className="detail-name">{post.name}</p>
        <span className="detail-category">{post.category}</span>
      </div>
      <div className="views">
        <p>Views</p>
        <span className="views-count">{post.views}</span>
      </div>
      <div className="applications">
        <p>Applications</p>
        <span className="applications-count">{post.application}</span>
      </div>
      <div className="buttons">
        <button className="btn-view">View</button>
        <button className="btn-edit" onClick={() => {setEditNewPostwindow(true);}}>Edit</button>
      </div>
      <NewEditPost Data={post} isOpened={EditNewPostwindow} onClose={() => {setEditNewPostwindow(false);}}></NewEditPost>
    </div>
  );
};

export default Postpc;

const NewEditPost = ({ Data, isOpened, onClose }) => {
  if (!isOpened) {
    return null;
  }

  return createPortal(
    <div className="overlay">
      <div className="New-Edit-conatainer">
        <div className="New-edit-main-contant">

          <div className="New-edit-1">
            <div className="New-edit-1-1">
              <h3>Topic</h3>
              <input type="text" placeholder="Enter topic" value={Data.name}></input>
            </div>
          </div>
          
          <div className="New-edit-2">
            <div className="New-edit-2-1">
              <h3>Project</h3>
              <input type="text" placeholder="Select Project" value={Data.name}></input>
            </div>

            <div className="New-edit-2-2">
              <h3>Date & Time</h3>
              <input type="Text" placeholder="Enter Date and Time" value={Data.Date_cast}></input>
            </div>
          </div>
        
          <div className="New-edit-3">
            <h3>Details</h3>
            <input type="text" placeholder="" value=""></input>
          </div>
        </div>

        <button onClick={onClose}>Publish</button>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
