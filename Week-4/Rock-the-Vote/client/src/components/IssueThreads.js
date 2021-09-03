import React, {useState} from 'react';
import CommentsThread from './CommentsThread';

const initInputs = {issue: ""}

export default function IssueThreads(props){
    const [inputs, setInputs] = useState(initInputs)
    const { selectIssue, selectIssueThread } = props

    function handleChange(e){
        const{name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        selectIssue(inputs)
        setInputs(initInputs)
    }

    const {issue} = inputs
    return(
        <div>
        <form onSubmit={handleSubmit}>
            <label for="issue">Choose an Issue:</label>
            <select
                name="issue" 
                value={issue} 
                onChange={handleChange}> 
                <option value="human's Rights">human's Rights</option>
                <option value="Voting Rights">Voting Rights</option>
                <option value="Term Limits">Term Limits</option>
                <option value="Social Security">Social Security</option>
            </select>
            <button> View </button>
        </form>
        <CommentsThread selectIssueThread= {selectIssueThread} />
        </div>
    )
}