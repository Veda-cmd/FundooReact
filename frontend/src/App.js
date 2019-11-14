import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Register from './components/Register';
import Forgot from './components/Forgot';
import Reset from './components/Reset';
import Dashboard from './components/Dashboard';
import Login  from './components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Login}></Route>
          <Route path='/register' exact component={Register}></Route>
          <Route path='/dashboard' exact component={Dashboard}></Route>
          <Route path='/forgot' exact component={Forgot}></Route>
          <Route path='/reset/:token' exact component={Reset}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
