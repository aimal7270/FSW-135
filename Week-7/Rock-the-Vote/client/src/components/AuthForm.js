import React from 'react'

export default function AuthForm(props) {
    const {
        handleChange,
        handleSubmit,
        btnTxt,
        inputs: {
            username,
            password
        },
        errMsg
    } = props
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                name="username"
                onChange={handleChange}
                placeholder="Username" />
            <input 
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
                placeholder="Password" />
            <button>{btnTxt}</button>
            <p>{errMsg}</p>
        </form>
    )
}