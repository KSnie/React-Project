import React from "react";
import "../css-pages/Postpc.css";

const Postpc = () => {
  const postData = [
    {
      name: "Conjuring",
      category: "Horror",
      views: 69,
      application: 69,
      PostID: 1,
    },
    {
      name: "Romeo and Juliet",
      category: "Romantic",
      views: 96,
      application: 96,
      PostID: 2,
    },
    {
      name: "Luang Pee Jas 5G",
      category: "Comedy",
      views: 555,
      application: 123,
      PostID: 3,
    },
  ];

  return (
    <div className="post-main">
      <div className="post-header">
        <h2>Posts</h2>
        <button>New Post</button>
      </div>
      <div className="posts-container">
        {postData.map((post) => (
          <Post post={post} key={post.PostID} />
        ))}
      </div>
    </div>
  );
};

const Post = ({ post }) => {
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
        <button className="btn-edit">Edit</button>
      </div>
    </div>
  );
};

export default Postpc;
