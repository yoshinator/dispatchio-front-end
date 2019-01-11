import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom'

import Navbar from './components/navigation/Navbar'
import { Signup } from './components/navigation/Signup'
import Login from './components/navigation/Login'
import Home from './components/Home'

class App extends Component {
  render() {
    return <div>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </div>;
  }
}

export default withRouter(App);
