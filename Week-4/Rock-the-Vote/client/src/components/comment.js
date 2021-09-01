import React from 'react';

export default function Comment(props){
    const {user, issue, body, datePosted} = props
    return(
        <div className="comment">
            <h1>{issue}</h1>
            <p>{body}</p>
            <h5>User: {user} on {datePosted} </h5>
        </div>
    )
}