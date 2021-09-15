import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Navbar(props) {
    const { logout, token } = props

    return (
        <div className="navbar">
            {!token && <NavLink exact to="/">Home Page</NavLink>}
            {token && <NavLink to="/profile">Profile</NavLink>}
            <NavLink to="/issues">Issues</NavLink>
            {token && <NavLink to="/mycomments">My Comments</NavLink>}
            {token && <NavLink to="/" onClick={logout}>Logout</NavLink>}
        </div>
    )
}