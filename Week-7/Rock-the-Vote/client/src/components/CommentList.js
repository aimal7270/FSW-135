import React from 'react'
import Comment from './Comment.js'

export default function CommentsList(props) {
    const { comments } = props
    let listComments = comments.map(comment => 
    <Comment {...comment} key={comment._id} />)

    return (
        <div className="listComment">
            {listComments}
        </div>
    )
}