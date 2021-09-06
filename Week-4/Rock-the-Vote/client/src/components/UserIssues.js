import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import UserIssue from "./UserIssue";

export default function UserIssues(props) {
  const { userIssues } = useContext(UserContext);
  return (
    <div>
      {userIssues.map((issue) => (
        <UserIssue {...issue} key={issue._id} />
      ))}
    </div>
  );
}