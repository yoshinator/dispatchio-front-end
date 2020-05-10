import React from 'react'
import {  Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutAction } from '../../actions/user'


function Navbar(props) {

  const handleLogout = () => {
    window.localStorage.clear()
    props.logout()
  }

  const logInToggle = () => {
    if (props.loginReducer.loggedIn) {
      return <nav>
        <Link to="/">
          Dispatchio
        </Link>
        <button type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span/>
        </button>
        <div id="navbarNav">
          <ul>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <button onClick={(event, props) => handleLogout(event, props)}>
                Log Out
            </button>

            </li>
          </ul>
        </div>
      </nav>;
    } // END IF
    else {
      return (
        <nav >
          <Link to="/">Dispatchio</Link>
          <button type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span></span>
          </button>
          <div id="navbarNav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li >
                <Link to="/login">Login</Link>
              </li>
              <li >
                <Link to="/signup">Sign Up</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);