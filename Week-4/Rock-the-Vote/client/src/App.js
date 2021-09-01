import React, {useContext} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from './context/UserProvider';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Public from './components/public';

import './styles.css';

function App() {
  const {token, logout} = useContext(UserContext)
  return (
    <div className="app">
      <Navbar logout = {logout} />
      <Switch>
        <Route
          exact path = "/"
          render={()=> token ? <Redirect to="/profile" /> : <Auth /> }
        />
        <Route
          path="/profile"
          render = {() => <Profile />}
        />
        <Route
          path="/public"
          render = {()=> <Public />}
        />
      </Switch>
    </div>
  )
}

export default App;