import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/navigation/Navbar'
import Signup from './components/navigation/Signup'
import Login from './components/navigation/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Locations from './components/Locations'
import NoMatch from './components/Nomatch'
import Teams from './components/teams/Teams'

class App extends Component {
  renderRoutes = () => {
    if (this.props.user){
     if (this.props.user.user_type === "owner" || this.props.user.user_type === "manager"){
       return (
         <>
       <Route path="/jobs" component={Jobs}></Route>
       <Route path="/locations" component={Locations}></Route>
       <Route path="/teams" component={Teams}></Route>
       </>
       )
     }
    }
  }

  render() {
    return <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {this.renderRoutes()}
          <Route component={NoMatch} />
        </Switch>
      </div>;
  }
}

  const mapsStateToProps = (state) => ({
    user: state.loginReducer.user
  })

export default withRouter(connect(mapsStateToProps)(App));
