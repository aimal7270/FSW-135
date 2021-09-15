import React, { useState, useEffect } from 'react'
import axios from 'axios'
import IssuesList from './IssuesList'

export default function IssuesPage(props) {
    const { userAxios } = props
    const [issues, setIssues] = useState([])

    useEffect(() => {
        axios.get("/publicIssues")
            .then(res => {
                setIssues(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }, [])

    return (
        <div className="box">
            <h1>Political Issues</h1>
            <IssuesList 
                issues={issues} 
                userAxios={userAxios} 
            />
        </div>
    )
}