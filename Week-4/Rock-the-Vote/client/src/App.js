
import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Profile from './components/Profile'
import Issue from './components/Issue'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContext } from './context/UserProvider'
//import './App.css';

export default function App(){
  const { token } = useContext(UserContext)
  return (
    <div className="app">
       <Navbar/>
      <Switch>
        <Route 
          exact path="/" 
          render={()=> token ? <Redirect to="/profile"/> : <Auth />}
        />
        <ProtectedRoute 
          path='/profile'
          component={Profile}
          redirectTo='/'
          token={token}
          
        />
        <ProtectedRoute 
          path='/issue'
          component={Issue}
          redirectTo='/'
          token={token}
          
        />
      </Switch>
      <Issue />
    </div>
  )
};