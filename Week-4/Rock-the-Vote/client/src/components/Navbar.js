import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar(props){
    const { logout }= props
    return(
        <div className='NavBar'> 
            <Link to="/profile">Profile</Link>
            <Link to="/ThreadView">View</Link>
            <button onClick={logout}>Logout</button>
        </div>
    )
}