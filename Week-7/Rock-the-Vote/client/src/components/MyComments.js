import React, { useState, useEffect } from 'react'
import IssuesList from './IssuesList.js'

export default function MyStuff(props) {
    const { userAxios } = props

    const [userIssues, setUserIssues] = useState([])

    useEffect(() => {
            userAxios.get("/api/issues/user")
                .then(res => {
                    setUserIssues(res.data)
                })
                .catch(err => console.log(err.response.data.errMsg))    
    }, [])

    return (
        <div className="boc">
            <h1>My Comments</h1>
            <IssuesList issues={userIssues} userAxios={userAxios} />
        </div>
    )
}