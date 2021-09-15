import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.js'
import { UserContext } from '../context/UserProvider.js'

const initInputs = {
    username: "",
    password: ""
}

export default function Auth() {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)
    const { signup, login, errMsg, } = useContext(UserContext)

    function handleChange(e) {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))  
    }
    
    function handleSignup(e) {
        e.preventDefault()
        signup(inputs)        
    }

    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
    }
    
    function toggleForm() {
        setToggle(prev => !prev)
        
    }

    return (
        <div className="container1">
            <h1>Rock The Vote</h1>
            {!toggle ?
                <>
                <AuthForm
                    handleChange={handleChange}
                    handleSubmit={handleSignup}
                    inputs={inputs}
                    btnTxt="Sign Up"
                    errMsg={errMsg}
                />
                <h3 onClick={toggleForm}>Members Signin</h3>
                </>
            :
                <>
                <AuthForm
                    handleChange={handleChange}
                    handleSubmit={handleLogin}
                    inputs={inputs}
                    btnTxt="Log In"
                    errMsg={errMsg}
                />
                <h3 onClick={toggleForm}>Become a Member</h3>
                </>
            }
        </div>
    )
}