import React from 'react'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import "./navigation.css";

import { logOutAction } from '../../actions/user'
import { Signup }  from './Signup'
import Login from './Login'
import Home from '../Home'


function Navbar(props) {

  const handleLogout = () => {
    window.localStorage.clear()
    props.logout()
  }

  const logInToggle = () => {
    if (props.loginReducer.loggedIn) {
      return <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Dispatchio
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={(event, props) => handleLogout(event, props)} className="nav-link">
                Log Out
            </button>

            </li>
          </ul>
        </div>
      </nav>;
    } // END IF
    else {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Dispatchio</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            </ul>
          </div>
        </nav>
      )
    }//END ELSE 
  }

  //RETURN FOR Navbar
  return <div>
      {logInToggle(props)}
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>;
}//END Navbar()

const mapStateToProps = state => ({
  loginReducer: state.loginReducer
});

function mapDispatchToProps(dispatch) {
  return  {
    logout: () => {
    dispatch(logOutAction())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));