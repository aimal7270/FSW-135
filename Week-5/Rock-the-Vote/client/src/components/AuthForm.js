import React from 'react'

export default function AuthForm(props){
  const {
    handleChange, 
    handleSubmit, 
    btnText, 
    errMsg,
    inputs: {
      username,
      password,
      //email
    } 
  } = props
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Username"/>
        {/* <input 
        type="email" 
        value={email} 
        name="email" 
        onChange={handleChange} 
        placeholder="email"/> */}
      <input 
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"/>
      <button>{ btnText }</button>
      <p style={{backgroundColor: "#c00000", color: "#ffffff", textAlign: "center"}} >{ errMsg }</p>
    </form>
  )
}