import React from "react";
import '../css-pages/PostPopup.css';

const PostPopup = ({ selectedPost, onClose }) => {
  return (
    <div className="post-popup">
      <h2>PostDetail Page</h2>
      <div>
        <h1>{selectedPost.Studio_name}</h1>
        <p>Category: {selectedPost.Catagory}</p>
        <p>{selectedPost.Post_Detail}</p>
        {/* Add other details here */}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PostPopup;
