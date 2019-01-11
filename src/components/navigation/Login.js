import React, {Component} from 'react'
import { connect } from  'react-redux'
import {withRouter, Redirect } from 'react-router'

import { loginAction } from '../../actions/user'




class Login extends Component {
  state ={ 
    email: "",
    password: ""
  }
  
  
  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.props.login)
    this.props.login(this.state.email, this.state.password)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleError = () => {
    if(this.props.failedLogin) {
      return <h3 className="card-title text-white bg-danger text-center">
          {this.props.error}
        </h3>; 
    } else {
      return null
    }
  }

  render(){
  return this.props.loggedIn ? (
  <Redirect to="/"/> ) : (
  <div className="card">
      <div className="card-body">
        { this.handleError()}
        <form onSubmit={this.handleSubmit} autoComplete="on">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input onChange={this.handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} name="email" />
          </div>

          <div className="form-group">
            <label htmlFor="input-password">Password</label>
            <input onChange={this.handleChange} type="password" className="form-control" id="input-password" placeholder="Password" value={this.state.password} name="password" autoComplete="password" />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
  </div>);
  }
}

// const mapStateToProps = (state) => ({
//   authenticatingUser: state.user.user.authenticatingUser,
//   failedLogin: state.user.user.failedLogin,
//   error: state.user.user.error,
//   loggedIn: state.user.user.loggedIn
// })
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));