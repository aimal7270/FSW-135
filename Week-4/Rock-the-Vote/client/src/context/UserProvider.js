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
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    issues: [],
    userComments: [],
    issueComments: [],

    function :signup(credentials) {
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
            axios
              .post("/auth/login", credentials)
              .then((res) => {
                const { user, token } = res.data;
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
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUserState({
              user: {},
              token: "",
              issues: [],
            });
          }
          
  function addIssue(newIssue) {
    userAxios
      .post("/api/issues/", newIssue)
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
      .get("/api/issues")
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
        }}
        >
        {props.children}
        </UserContext.Provider>
      );
    