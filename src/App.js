import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/navigation/Navbar'
import Signup from './components/navigation/Signup'
import Login from './components/navigation/Login'
import Home from './components/Home'
import Jobs from './components/jobs/Jobs'
import CreateJob from './components/jobs/CreateJob'
import Locations from './components/Locations'
import Teams from './components/teams/Teams'
import TeamMembers from './components/teams/TeamMembers'
import Customers from './components/customers/Customers'
import GoogleMap from './components/GoogleMap'
import NoMatch from './components/Nomatch'
import { fetchCurrentUser } from './actions/user'
import EditCustomer from './components/customers/EditCustomer';
import CreateCustomer from './components/customers/CreateCustomer';

class App extends Component {


  render() {
    return <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/jobs" component={Jobs}></Route>
          <Route path="/createjob" component={CreateJob}></Route>
          <Route path="/locations" component={Locations}></Route>
          <Route path="/teams" component={Teams}></Route>
          <Route path="/teammembers" component={TeamMembers}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/editcustomer" component={EditCustomer}></Route>
          <Route path="/createcustomer" component={CreateCustomer}></Route>
          <Route path="/map/:id" component={GoogleMap}></Route>
          <Route component={NoMatch} />
        </Switch>
      </div>;
  }
}

  const mapsStateToProps = (state) => ({
    user: state.loginReducer.user
  })

  const mapDispatchToProps = (dispatch) => {
    return { 
      fetchCurrentUser: () => dispatch(fetchCurrentUser()) 
    };
  }

export default
  withRouter(
    connect(
      mapsStateToProps,
      mapDispatchToProps
    )(App)
  );

