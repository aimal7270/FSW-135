import React from 'react';

export default function LoginForm(props){
    const{ handleChange, handleSubmit, inputs: { username, password}} = props

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            value={username} 
            name="username" 
            onChange={handleChange} 
            placeholder="Username"/>
        <input 
            type="text" 
            value={password} 
            name="password" 
            onChange={handleChange} 
            placeholder="Password"/>
            <button>Login</button>
        </form>
    )




}