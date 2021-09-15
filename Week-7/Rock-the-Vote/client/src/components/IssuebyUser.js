import React, { useState, useEffect } from 'react'
import IssuesList from './IssuesList.js'


export default function IssuesByUser(props) {
    const { userAxios } = props
    const initState = {
        user: props.user,
        userIssues: []
    }

    const [userState, setUserState] = useState(initState)

    useEffect(() => {
        console.log(props.match.params.user)

        userAxios.get(`/api/issues/user/${userState.user._id}`)
            .then(res => {
                setUserState(prevUserState => 
                    ({
                    ...prevUserState,
                    userIssues: res.data
                    })
                )
            .catch(err => console.log(err.response.data.errMsg))    
        }, [])
    })


    return (
        <div className="box">
            <p>{userState.user.username}'s posted political issues...</p>
            <IssuesList 
            issues={userState.userIssues} 
            />
        </div>
    )
}