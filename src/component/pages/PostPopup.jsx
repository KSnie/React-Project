import React from "react";

const PostPopup = ({ dataPost }) => {
  return (
    <div>
      <h2>PostPopup Page</h2>
      <div>
        <strong>Category:</strong> {dataPost.Category}
      </div>
      <div>
        <strong>Date Casting:</strong> {dataPost.Date_casting}
      </div>
      <div>
        <strong>Post Detail:</strong> {dataPost.Post_Detail}
      </div>
      <div>
        <strong>Post Movie Name:</strong> {dataPost.Post_Movie_name}
      </div>
      <div>
        <strong>Post ID:</strong> {dataPost.Post_id}
      </div>
      <div>
        <strong>Studio Name:</strong> {dataPost.Studio_name}
      </div>
      <div>
        <strong>Time Casting:</strong> {dataPost.Time_casting}
      </div>
      <div>
        <strong>User Profile ID:</strong> {dataPost.userProfile_id}
      </div>
      <p>
        This is the content of the PostPopup Page
        {console.log(dataPost.Studio_name)}.
      </p>
    </div>
  );
};

export default PostPopup;
