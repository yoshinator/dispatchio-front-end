import React from 'react'
import {  Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutAction } from '../../actions/user'
import { resetTeamMemberFlagsAction, resetTeamFlagsAction } from '../../actions/team'
import './Navbar.css'

function EmployeeNavBar(props){
  return <nav>
    <ul>
      <li>
        <Link to="#" onClick={() => props.handleLogout()}>
          Log Out
              </Link>
      </li>
    </ul>
  </nav>
}

function MainNavBar(props){
  const handleTeamMemberClick = () => {
    props.resetMemberFlags()
  }

  const handleTeamClick = () => {
    props.resetTeamFlags()
  }
  return <nav>
    <ul>
      <li>
        <Link to="/jobs">Jobs</Link>
      </li>
      <li>
        <Link onClick={handleTeamClick} to="/teams">Teams</Link>
      </li>
      <li>
        <Link onClick={handleTeamMemberClick} to="/teammembers">Team Members</Link>
      </li>
      <li>
        <Link to="/customers">Customers</Link>
      </li>
      <li>
        <Link to="#" onClick={() => props.handleLogout()}>
          Log Out
        </Link>
      </li>
    </ul>
  </nav>
}

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
          {props.loginReducer.user.user_type === "employee" ? <EmployeeNavBar {...props} handleLogout={handleLogout}/> : <MainNavBar {...props} handleLogout={handleLogout} />}
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <span></span> {/**Span must stay here for hamburger */}
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

const mapStateToProps = ({loginReducer}) => ({
  loginReducer
})

function mapDispatchToProps(dispatch) {
  return  {
    logout: () => {
    dispatch(logOutAction())
    },
    resetMemberFlags: () => {
      dispatch(resetTeamMemberFlagsAction())
    },
    resetTeamFlags: () => {
      dispatch(resetTeamFlagsAction())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);