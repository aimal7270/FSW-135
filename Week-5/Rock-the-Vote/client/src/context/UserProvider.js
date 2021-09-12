import React, { useState } from "react";
import axios from "axios";

export const UserContext = React.createContext();

const userAxios = axios.create();
userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function UserProvider(props) {

  //localStorage.removeItem("user")
  //localStorage.removeItem("token")
  
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    issues: [],
    userComments: [],
    issueComments: [],
    userIssues: [],
    username: "",
    errMsg: "",
  };

  const [userState, setUserState] = useState(initState);

  function handleAuthErr(errMsg) {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  function resetAuthErr() {
    setUserState((prevState) => ({
      ...prevState,
      errMsg: "",
    }));
  }

  function signup(credentials) {
    axios
      .post("/auth/signup", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch (err => handleAuthErr(err.response.data.errMsg));
  }

  function login(credentials) {

    console.log('inside login - UserProvider', credentials)

    axios
      .post("/auth/login", credentials)
      .then((res) => {
        const { user, token } = res.data;

        console.log('token: ', token)

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        getUserIssues();
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch (err => handleAuthErr(err.response.data.errMsg));
  }

  function logout() {
    //localStorage.removeItem("token");
    //localStorage.removeItem("user");
    setUserState({
      user: {},
      token: "",
      issues: [],
    });
  }

  function addIssue(newIssue) {
    userAxios
      .post("/api/issue/", newIssue)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: [...prevState.issues, res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function getUserIssues() {
    userAxios
      .get("/api/issue")
      .then((res) => {
        //assigns res.data to issues to populate context
        setUserState((prevState) => ({
          ...prevState,
          issues: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }
  function getCommentsForUser() {
    userAxios
      .get(`/api/comments/user/${userState.user._id}`) //grabs users id from user in context
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          userComments: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function getCommentsForIssue(_id) {
    userAxios
      .get(`api/comments/issues/${_id}`)

      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issueComments: res.data,
        }));
        console.log(userState.issueComments);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function postComment(event, newComment) {
    const par = event.target.parentNode;
    const id = par.parentNode.id;
    newComment.issueId = id;
    userAxios
      .post(`/api/comments`, newComment)
      .then((res) => console.log(`Added to DB`))
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function getUserName(id) {
    userAxios.get(`/api/user/${id}`).then((res) => {
      const newUserName = res.data;
      setUserState((prevState) => ({
        ...prevState,
        username: newUserName,
      }));
    });
  }

  function getIssuesForUser() {
    userAxios
      .get(`/api/issues`)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          userIssues: res.data,
        }));
        console.log(userState.userIssues);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function deleteComment(id) {
    userAxios
      .delete(`/api/comments/${id}`)
      .then((res) => {
        getCommentsForUser();
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function deleteIssue(id) {
    userAxios
      .delete(`/api/issues/${id}`)
      .then((res) => {
        getIssuesForUser();
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function addLike(event) {
    const btnPar = event.target.parentNode;
    const id = btnPar.id;
    userAxios
      .put(`/api/issues/likes/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function addDislike(event) {
    const btnPar = event.target.parentNode;
    const id = btnPar.id;
    userAxios
      .put(`/api/issues/dislikes/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function addCommentLike(event) {
    const btnPar = event.target.parentNode;
    const id = btnPar.id;
    userAxios
      .put(`/api/comments/likes/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function addCommentDislike(event) {
    const btnPar = event.target.parentNode;
    const id = btnPar.id;
    userAxios
      .put(`/api/comments/dislikes/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addIssue,
        getCommentsForUser,
        getCommentsForIssue,
        postComment,
        getUserIssues,
        getUserName,
        resetAuthErr,
        getIssuesForUser,
        deleteComment,
        deleteIssue,
        addLike,
        addDislike,
        addCommentLike,
        addCommentDislike,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}