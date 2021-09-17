import React, { useContext, useState } from 'react'
import Comment from '../components/Comment'
import {UserContext} from '../context/UserProvider'
import CommentForm from '../components/CommentForm'

export default function Issue (props) {
  const [pComment, setPComment] = useState(false)
  const [displayComments, setDisplayComments] = useState(false)
  
  const {username, getCommentsForIssue, issueComments, getUserName, addLike, addDislike, getUserIssues} = useContext(UserContext)
  const { topic, _id, imgUrl,description, postDate, likes, dislikes } = props
  console.log(topic, _id, imgUrl, postDate, likes, dislikes)
  console.log(props)
  function togglePComment () {
    setPComment(prevState => !prevState)
  }

  function toggleDispComments () {
    setDisplayComments(prevState => !prevState)
    if(!displayComments){
      getCommentsForIssue(_id)
    }
  }

  function addALike (event) {
    addLike(event)
    getUserIssues()
  }

  function addADislike (event){
    addDislike(event)
    getUserIssues()
  }

  return (
    <div id={_id} key={_id} className = 'issue'>

      <h1>{topic}</h1>
      <h3>{description}</h3>
      <img src={imgUrl} width="350" height="300" alt="thisisapicture"/><br/>

      <p>Posted By: @{username}</p>
      <p><strong>Likes:</strong> {likes} <strong>Dislikes:</strong> {dislikes}</p><br/>
      <p>Post Date: {Date(postDate)}</p>
      

      {displayComments ?
      issueComments.map(comment => <Comment {...comment} key={comment._id} getUserName = {getUserName}/>) : 
      <button onClick={()=>toggleDispComments()}>View Comments</button>}

      {displayComments ? <button onClick={()=>toggleDispComments()}>Hide Comments</button> : ""}

      {pComment ? <CommentForm togglePComment = {()=>togglePComment()}/> : <button onClick={()=>togglePComment()}>Post a Comment</button>}
      {!displayComments ? <button onClick={()=>addALike()}>Like</button> : "" }
      {!displayComments ? <button onClick={()=>addADislike()}>Dislike</button> : ""}
      
      

    </div>
  )
}