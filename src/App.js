
import React, { Component } from 'react';
import Home from './Home/home.js';
import Login from './login.js';
// import AddBooks from './Home/addBooks.js';
import { BrowserRouter as Router, Route } from "react-router-dom";
export default class extends Component {
render()
{
  return(
    <Router>
      <Route path="/" exact component={Login}></Route>
      <Route path="/Home" exact component={Home}></Route>
    </Router>
  );
}

}
