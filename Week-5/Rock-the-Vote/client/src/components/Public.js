import React, { useContext } from 'react'
import IssueList from './IssueList.js'

// eslint-disable-next-line 
import Issue from './Issue.js'
import { UserContext } from '../context/UserProvider.js'

export default function Public(){
  const {
  user: { username },  issues } = useContext(UserContext)
  return (
    <div id='public'>
     
     <h1>Welcome @{username}!</h1>
      <hr/>
      <br/>
      <Issue/>

      <h3>Your Issues</h3>
      
      <IssueList issues={issues}/>
      </div>
    
  )
}