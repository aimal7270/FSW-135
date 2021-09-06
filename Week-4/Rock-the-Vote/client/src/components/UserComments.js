import React, {useContext} from 'react'
import { UserContext } from '../context/UserProvider'
import UserComment from './UserComment'

export default function UserComments() {
  const { userComments } = useContext(UserContext)
  return (
    <div>
      {userComments.map(comment => <UserComment {...comment} key={comment._id}/>)}
    </div>
  )
}