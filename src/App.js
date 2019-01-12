import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/navigation/Navbar'
import { Signup } from './components/navigation/Signup'
import Login from './components/navigation/Login'
import Home from './components/Home'
import NoMatch from './components/Nomatch'

class App extends Component {
  render() {
    return <div>
        <Navbar />
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={NoMatch} />
      </Switch>
      </div>;
  }
}

export default withRouter(App);
