import React, {useContext} from 'react';
import CommentBox from './CommentBox.js';
import IssueThreads from './IssueThreads.js';
import {UserContext} from '../context/UserProvider';


export default function ThreadView(props){
  const{selectIssue, addComment} = useContext(UserContext)
 

  return (
    <div className="ThreadView">
      <h1>Select an Issue Thread</h1>
      <IssueThreads selectIssue={selectIssue} />

    </div>


  )
}