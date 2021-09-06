import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'

export default function Comment(props) {
  const { addCommentLike, addCommentDislike, getCommentsForIssue } = useContext(UserContext)
  const { _id, username, issueId } = props
  
  function addLike (event) {
    addCommentLike(event, issueId)
    getCommentsForIssue(issueId)
  }

  function addDislike(event){
    addCommentDislike(event, issueId)
    getCommentsForIssue(issueId)
  }

  return (
    <div key={_id} id={_id} className='comment'>
      <h2>{props.comment}</h2>
      <span>{username}</span>
      <span> Posted: {props.postDate}</span>
      <span> Likes: {props.likes}</span>
      <span> Dislikes: {props.dislikes}</span>
      <button onClick={addLike}>Like</button>
      <button onClick={addDislike}>Dislike</button>
    </div>
  )
}