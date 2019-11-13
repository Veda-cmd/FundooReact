import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Login  from './components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Register}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/dashboard' component={Dashboard}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
