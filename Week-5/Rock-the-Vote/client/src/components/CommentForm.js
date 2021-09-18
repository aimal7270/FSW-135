import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider'

const initInputs = {
  comment: ""
}
export default function CommentForm(props) {
  const [inputs, setInputs] = useState(initInputs)
  // Need to check here
  const { postComment } = useContext(UserContext)

  function handleChange(e) {
    const { name, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    postComment(event, inputs)
    setInputs(initInputs)
    props.togglePComment()
  }

  const { comment } = inputs
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type = "text"
          name="comment"
          value={comment}
          placeholder="New Comment"
          onChange={handleChange} />
        <span>
        <button>Post!</button>
        </span>
      </form>
      <button onClick={props.togglePComment}>Cancel</button>
    </div>
  )
}