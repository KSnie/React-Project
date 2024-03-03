import React, {useState , useEffect} from "react";
import profile from "../image/profile.svg";
import profile2 from "../image/profile2.svg";
import "../css-pages/cp-post.css";
import optionIcon from "../image/optionIcon.svg"
import axios from "axios";

const Post = ({ onPageChange, onChangePost}) => {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/post/getpost");
        setPostsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      {postsData.map((post) => (

        <div key={post.Post_id} className="Header-post">
            
            <div className="post-top">
              <div className="user-info-post">
                  <img src={profile2} alt="profile"/>
                  <div className="Name-post">
                    <h1>{post.f_name} {post.l_name}</h1>
                    <p>Category {post.category}</p>
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
                <p>{post.post_details}</p>
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
