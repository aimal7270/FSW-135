import React, { useState } from 'react'
import axios from 'axios'
export const IssueContext = React.createContext()
const userAxios = axios.create()

// Axios Interceptors
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function IssueProvider(props) {
    return(
        <IssueContext.Provider>
            {props.children}
        </IssueContext.Provider>
    )
}