import React, { Component } from 'react'
import { connect } from  'react-redux'
import { Redirect } from 'react-router'

import { loginAction } from '../../actions/user'
import About from "../About"

class Login extends Component {
  state ={ 
    email: "",
    password: ""
  }
  
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.login(this.state.email, this.state.password)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleError = () => {
    if(this.props.failedLogin) {
      return <h3>
          {this.props.error}
        </h3>; 
    } else {
      return null
    }
  }

  render(){
  return this.props.loggedIn ? (
  <Redirect to="/"/> ) : (
    <div className="container">
        { this.handleError()}
        <div className="form-container"> 
          <h2>Login</h2>
          <div className="form">
            <form onSubmit={this.handleSubmit} autoComplete="on">

                <label htmlFor="exampleInputEmail1">Email address</label>
                <input onChange={this.handleChange} type="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} name="email" />

                <label htmlFor="input-password">Password</label>
                <input onChange={this.handleChange} type="password" id="input-password" placeholder="Password" value={this.state.password} name="password" autoComplete="password" />
                <div>
                  <button className="button" type="submit">Login</button>
                </div>
            </form>
          </div>
        </div>
        <About />
      </div>
    )
    
  }
}

const mapStateToProps = ({loginReducer: {user: authenticatingUser, failedLogin, error, loggedIn}}) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})

function mapDispatchToProps(dispatch){
  return {
    login: (email, password) => {
      dispatch(loginAction(email,password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);