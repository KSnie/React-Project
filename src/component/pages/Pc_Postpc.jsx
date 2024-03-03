import React, { useState, useEffect } from "react";
import "../css-pages/Postpc.css";
import { createPortal } from "react-dom";
import axios from "axios";

const Postpc = ({ userData }) => {

  const [EditNewPostwindow, setEditNewPostwindow] = useState(false);
  const [postData, setpostData] = useState([]);

  const updatePostdata = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/ProjectCreator/getpostdata",
        {
          user_id: userData.user_id,
        }
      );

      if (Array.isArray(response.data.data)) {
        setpostData(response.data.data);
      } else {
        console.error("Invalid data format received", response.data);
      }
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/ProjectCreator/getpostdata",
          {
            user_id: userData.user_id,
          }
        );

        if (Array.isArray(response.data.data)) {
          setpostData(response.data.data);
        } else {
          console.error("Invalid data format received", response.data);
        }
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
  
    fetchData();
  }, [userData]);

  return (
    <div className="post-main">
      <div className="post-header">
        <h2>Posts</h2>
        <button onClick={() => {setEditNewPostwindow(true);}}>New Post</button>
      </div>
      <div className="posts-container">

        {postData.map((post) => (
          <Post post={post} key={post.post_id} userData={userData} updatePostdata = {updatePostdata()}/>
        ))}

      </div>
      <NewEditPost isOpened={EditNewPostwindow} onClose={() => {setEditNewPostwindow(false);}} userData ={userData} updatePostdata = {updatePostdata()}></NewEditPost>
    </div>
  );
};

const Post = ({ post, updatePostdata }) => {

  const deletePost = async (postId) => {
    try {
      const response = await axios.post("http://localhost:3000/ProjectCreator/deletepost", {
        post_id: postId,
      });
  
      console.log("Post deleted successfully");

      updatePostdata();
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  return (
    <div className="post">
      <div className="detail">
        <p className="detail-name">{post.project_title}</p>
        <span className="detail-category">{post.category}</span>
      </div>
      <div className="buttons">
        <button className="btn-edit" onClick={() => {deletePost(post.post_id)}}>Delete</button>
      </div>
    </div>
  );
};

export default Postpc;

const NewEditPost = ({ data, isOpened, onClose, userData ,updatePostdata}) => {
  const [MyprojectData, setMyprojectData] = useState([]);

  const [selectedProject, setSelectedProject] = useState("");

  const [detailPost, setDetailPost] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/ProjectCreator/getAllProjects",
          {
            user_id: userData.user_id,
          }
        );
        setMyprojectData(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchData();
  }, [userData]);


  const AddnewPost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/ProjectCreator/newpost",
        {
          project_id: selectedProject,
          detail: detailPost
        }
      );
      setMyprojectData(response.data);

      updatePostdata();
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  }


  if (!isOpened) {
    return null;
  }

  return createPortal(
    <div className="overlay">
      <div className="New-Edit-conatainer">
        <div className="New-edit-main-contant">
          
          <div className="New-edit-2">
            <div className="New-edit-2-1">
              <h3>Project</h3>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Select Project</option>
                {MyprojectData.map((project) => (
                  <option key={project.project_id} value={project.project_id}>
                    {project.project_title}
                  </option>
                ))}
              </select>
            </div>

          </div>
        
          <div className="New-edit-3">
            <h3>Details</h3>
            <input type="text" placeholder="" value={detailPost}onChange={(e) => {setDetailPost(e.target.value);}}></input>
          </div>
        </div>

        <button onClick={() => {onClose(); AddnewPost();}} >Publish</button>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
