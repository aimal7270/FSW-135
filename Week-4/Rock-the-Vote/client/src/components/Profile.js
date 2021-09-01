import React, {useContext} from 'react';
import CommentBox from './CommentBox.js';

import {UserContext} from '../context/UserProvider';
import singleUserComments from './CommentsThread.js';

export default function Profile(){
    const{user:{firstName, lastName, username}, 
        addComment, getUserComments} = useContext(UserContext)

    return(
        <div className="profile">
            <h1> Welcome {firstName} {lastName}, 
                you are commenting as @{username}</h1>
            <h3>Make a comment</h3>
            <CommentBox addComment={addComment} />
            <h3>View Your Comments</h3>
            <CommentsThread getUserComments={getUserComments}/>
        </div>
    )
}