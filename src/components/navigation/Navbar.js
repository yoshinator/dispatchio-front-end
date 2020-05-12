import React from 'react'
import {  Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutAction } from '../../actions/user'
import './Navbar.css'


function Navbar(props) {

  const handleLogout = () => {
    window.localStorage.clear()
    props.logout()
  }

  const logInToggle = () => {
    if (props.loginReducer.loggedIn) {
      return (
      <header>
          <h1 className="logo"><Link to="/">Dispatchio</Link></h1>
        <input type="checkbox" className="nav-toggle" id="nav-toggle" />
        <nav>
          <ul>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/teams">Teams</Link>
            </li>
            <li>
              <Link to="/teammembers">Team Members</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
            <li>
              <Link to="#" onClick={(event, props) => handleLogout(event, props)}>
                Log Out
              </Link>
            </li>
          </ul>
        </nav>
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <span></span>
        </label>
      </header>
      )
    } // END IF
    else {
      return (
        <header>
          <h1 className="logo">Dispatchio</h1>
          <input type="checkbox" className="nav-toggle" id="nav-toggle" />
          <nav>
              <ul>
                <li >
                  <Link to="/login">Login</Link>
                </li>
                <li >
                  <Link to="/signup">Sign Up</Link>
                </li>
              </ul>
          </nav>
          <label htmlFor="nav-toggle" className="nav-toggle-label">
            <span></span>
          </label>
        </header>
      )
    }//END ELSE 
  }

  //RETURN FOR Navbar
  return logInToggle(props)

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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);