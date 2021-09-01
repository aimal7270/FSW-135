import React, {useState} from 'react';

const initInputs = {issue: "", body: ""}

export default function CommentBox(props){
    const [inputs, setInputs] = useState(initInputs)
    const { addComment } = props

    function handleChange(e){
        const{name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [naem]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addComment(inputs)
        setInputs(initInputs)
    }

    const {issue, body} = inputs
    return(
        <form onSubmit={handleSubmit}>
            <label for="issue">Choose an Issue:</label>
            <select
                name="issue" 
                value={issue} 
                onChange={handleChange}> 
                <option value="Women's Rights">Women's Rights</option>
                <option value="Voting Rights">Voting Rights</option>
                <option value="Term Limits">Term Limits</option>
                <option value="Social Security">Social Security</option>
            </select>

            <input 
                type="text" 
                name="body" 
                value={body} 
                onChange={handleChange} 
                placeholder="Comment"/>
            <button>Comment</button>
        </form>
    )

}