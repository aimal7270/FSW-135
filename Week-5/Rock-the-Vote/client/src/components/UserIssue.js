import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";

export default function UserIssue(props) {
  const { deleteIssue } = useContext(UserContext);
  const { _id, imgUrl, topic, username, postDate, likes, dislikes } = props;
  // const {}

  function delIssue() {
    deleteIssue(_id);
  }

  return (
    <div key={_id} id={_id} className="issue">
      <h2>{topic}</h2>
      <img src = {imgUrl} 
      width="300" height="300"  alt="thisisapicture" />
      <br />
      <span>Posted By: {username}</span>
      <span> Posted: {Date(postDate)}</span>
      <span> Likes: {likes}</span>
      <span> Dislikes: {dislikes}</span>
      <button onClick={() => delIssue()}>Delete</button>
    </div>
  );
}