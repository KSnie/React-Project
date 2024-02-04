import React, { useState, useEffect } from "react";
import adimage1 from "../image/adimage1.svg";
import adimage2 from "../image/adimage2.svg";
import adimage3 from "../image/adimage3.svg";
import adimage4 from "../image/adimage4.svg";
import "../css-pages/Home.css";
import Post from "../pages/cp-post"



const Home = () => {
  const images = [
    { id: 1123, src: adimage1 },
    { id: 2123, src: adimage2 },
    { id: 3456, src: adimage3 },
    { id: 4852, src: adimage4 },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  const getCurrentImage = () => images[currentImageIndex].src;

  return (
    <div>
      <div className="containter">
        <div className="Header">
          <img src={getCurrentImage()} alt="sidebar" />

          <div className="Text-join">
            {images.slice(0, 3).map((image) => (
              <div key={image.id} className="text">
                <button onClick={() => console.log(images[currentImageIndex].id)}>Join us now</button>
                <p>And start your dream acting careers!</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="Post">
          <Post />
        </div>


      </div>
    </div>
  );
};

export default Home;
