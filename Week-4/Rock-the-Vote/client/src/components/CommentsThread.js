  
import React from 'react'
import Comment from './comment'

export default function Comments(props){
  const { comments } = props
  return (
    <div className="comments">
      { comments.map(comment => <Comment {...comment} key={comment._id}/>) }
    </div>
  )
}