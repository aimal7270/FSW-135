import React from 'react';

export default function LoginForm(props){
    const{ handleChange, handleSubmit, btnText, 
        inputs: { username, password, firstName, lastName, phoneNumber}} = props

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            value={firstName} 
            name="firstName" 
            onChange={handleChange} 
            placeholder="First Name"/>

            <input 
            type="text" 
            value={lastName} 
            name="lastName" 
            onChange={handleChange} 
            placeholder="Last Name"/>

            <input 
            type="numbers" 
            value={phoneNumber} 
            name="phoneNumber" 
            onChange={handleChange} 
            placeholder="Phone Number"/>

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

            <button>Sign Up</button>

        </form>
    )
}