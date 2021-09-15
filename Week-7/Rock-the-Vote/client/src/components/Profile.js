import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider.js'

export default function Profile(props) {

    const { user: {username}, 
        addIssue
    } = useContext(UserContext)

    const { user: {username} } = useContext(UserContext)
    return (
        <div className="container">
            <h1>Welcome {username}</h1>
            <p>Profile Page</p>
            <NewIssueForm
                addIssue={addIssue} />
        </div>
    )
}