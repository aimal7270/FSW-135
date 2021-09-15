import React, { useState } from 'react'

export default function Comment(props) {
    const initState = {
        _id: props._id,
        commentDate: props.commentDate,
        user: props.user,
        issue: props.issue,
        comment: props.comment
    }

    const [commentState, setCommentState] = useState(initState)

    return (
        <div className="commentBox">
            <p><span id="usernameIssue">({props.user.username} @ {props.commentDate})</span></p>
            <p className="comment">"{props.comment}"</p>
        </div>
    )
}