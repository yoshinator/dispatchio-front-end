import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createUserAction } from '../../actions/user'
import { Redirect } from 'react-router'
import About from "../About"

class Signup extends Component{
  state = {
    user_type: "",
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
    password: "",
    location_id: 1,
    pconfirm: ""
  } 

  passwordsMatch = () => {
    if(!this.state.password === this.state.pconfirm || this.state.password.length < 6){
      alert("Passwords must match and be atleast 6 characters")
      return false
    }
    else return true
    
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.passwordsMatch()){
      this.props.createUser(this.state)
    }
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    return this.props.loggedIn ? (
      <Redirect to="/" />) : 
      <div className="container">
        <div className="form-container">
          <div className="form">
            <form onSubmit={this.handleSubmit} autoComplete="one">
              <label htmlFor="sign-up-f-name">First Name</label>
              <input onChange={this.handleChange} type="text" id="sign-up-f-name" placeholder="First " name="f_name" value={this.state.f_name} />
          
              <label htmlFor="sign-up-l-name">Last Name</label>
              <input onChange={this.handleChange} type="text" id="sign-up-l-name" placeholder="Last " name="l_name" value={this.state.l_name} />

              <label htmlFor="sign-up-email">Email address</label>
              <input onChange={this.handleChange} type="email" id="sign-up-email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={this.state.email} />

              <label htmlFor="input-password">Password</label>
              <input onChange={this.handleChange} type="password" id="input-password" placeholder="Password" name="password" value={this.state.password} />

              <label htmlFor="input-password">Password Confirmation</label>
              <input onChange={this.handleChange} type="password" id="input-password-confim" placeholder="Confirm Password" name="pconfirm" value={this.state.pconfirm} />
             
              {/* USER TYPE RADIO BUTTONS  */}
              <label>Pick a user type</label>
              <div>
                <input onChange={this.handleChange} type="radio" name="user_type" id="owner" value="owner" checked />
                <label htmlFor="owner">
                  Owner
                </label>
              </div>
              <div>
                <input 
                  onChange={this.handleChange} 
                  type="radio" name="user_type" id="manager" value="manager"  
                  />
                <label htmlFor="manager">
                  Manager
                </label>
              </div>
              <div>
                <input onChange={this.handleChange} type="radio" name="user_type" id="employee" value="employee"/>
                <label htmlFor="employee">
                  Employee
                </label>
              </div>

            <button className="button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    <About />
    </div>
  }
}


const mapStateToProps = ({ loginReducer: { user: authenticatingUser, failedLogin, error, loggedIn } }) => ({
      authenticatingUser,
      failedLogin,
      error,
      loggedIn
    })  
  


function mapDispatchToProps(dispatch) {
  return {
    createUser: (user) => {
      dispatch(createUserAction(user))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);

