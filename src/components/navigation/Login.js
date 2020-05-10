import React, {Component} from 'react'
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
      return <h3 className="card-title text-white bg-danger text-center">
          {this.props.error}
        </h3>; 
    } else {
      return null
    }
  }

  render(){
  //TODO ::::   CHECK LINE 70 loggedIn wrong state. Also this state is changing for almost every action is because of auth check? Investigate.
    console.log(this.props.loggedIn)
  return this.props.loggedIn ? (
  <Redirect to="/"/> ) : (
    <div>
      <div>
          <div className="card-body">
            { this.handleError()}
            <form onSubmit={this.handleSubmit} autoComplete="on">
              <div>
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input onChange={this.handleChange} type="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} name="email" />
              </div>

              <div>
                <label htmlFor="input-password">Password</label>
                <input onChange={this.handleChange} type="password" id="input-password" placeholder="Password" value={this.state.password} name="password" autoComplete="password" />
              </div>

              <button type="submit">
                Login
              </button>
            </form>
          </div>
      </div>
      <About />
    </div>);
  }
}

// TODO :::: For some reason when this component is rendered from the address bar loggedIn false so we do not redirect to home :(
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