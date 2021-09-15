import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import UserProvider from './context/UserProvider.js';
import App from './App';
import './styles.css';



ReactDOM.render(
  <Strict.Mode>
  <BrowserRouter>
    <UserProvider>
        <App />
    </UserProvider>
  </BrowserRouter>
  </Strict.Mode>,
  document.getElementById('root')
);