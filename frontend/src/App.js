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
import Reminder from './components/Reminder';
import Verification from './components/Verification';

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Login}></Route>
          <Route path='/register' exact={true}component={Register}></Route>
          <Route path='/verify/:url' exact={true}component={Verification}></Route>
          <Route path='/dashboard' exact={true} component={Dashboard}></Route>
          <Route path="/dashboard/reminders" exact={true} component={Reminder}></Route>
          <Route path='/forgot' exact={true} component={Forgot}></Route>
          <Route path='/reset/:token' exact={true} component={Reset}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
