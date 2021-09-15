import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const initInputs = {
    title: "",
    description: ""
}

export default function NewIssueForm(props) {
    const [inputs, setInputs] = useState(initInputs)
    const { addIssue } = props
    const history = useHistory()

    function handleChange(e) {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))  
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        addIssue(inputs)
        setInputs(initInputs)
        history.push("/mystuff")
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a new post...</h2>
            <input
                type="text"
                value={inputs.title}
                name="title"
                onChange={handleChange}
                placeholder="Title" />
            <textarea 
                type="text"
                value={inputs.description}
                name="description"
                onChange={handleChange}
                placeholder="Description" />
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}