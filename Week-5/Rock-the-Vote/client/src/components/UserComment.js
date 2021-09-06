import React, {useContext} from 'react'
import { UserContext } from '../context/UserProvider'

export default function UserComment (props) {
  const { deleteComment } = useContext(UserContext)
  const {_id, username, postDate, likes, dislikes, comment} = props
  
  function delComment () {
    deleteComment(_id)
  }
  
  return (
    <div key={_id} id={_id} className = 'comment'>
      <h2>{comment}</h2>
      <span>@{username}</span>
      <span> Posted: {postDate}</span>
      <span> Likes: {likes}</span>
      <span> Dislikes: {dislikes}</span>
      <button onClick = { delComment }>Delete</button>
    </div>
  )
}