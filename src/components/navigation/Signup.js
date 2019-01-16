import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createUserAction } from '../../actions/user'
import { Redirect } from 'react-router'

class Signup extends Component{
  state = {
    user_type: "",
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
    password: "",
    location_id: 2,
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
      console.log("passwordsMatch")
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
      <Redirect to="/" />) : <div className="card">
      <div className="card-body">
        <form onSubmit={this.handleSubmit} autoComplete="one">
          <div className="form-group">
            <label htmlFor="sign-up-f-name">First Name</label>
            <input onChange={this.handleChange} type="text" className="form-control" id="sign-up-f-name" placeholder="First " name="f_name" value={this.state.f_name} />
          </div>
          <div className="form-group">
            <label htmlFor="sign-up-l-name">Last Name</label>
            <input onChange={this.handleChange} type="text" className="form-control" id="sign-up-l-name" placeholder="Last " name="l_name" value={this.state.l_name} />
          </div>

          <div className="form-group">
            <label htmlFor="sign-up-email">Email address</label>
            <input onChange={this.handleChange} type="email" className="form-control" id="sign-up-email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={this.state.email} />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="input-password">Password</label>
            <input onChange={this.handleChange} type="password" className="form-control" id="input-password" placeholder="Password" name="password" value={this.state.password} />
          </div>

          <div className="form-group">
            <label htmlFor="input-password">Password Confirmation</label>
            <input onChange={this.handleChange} type="password" className="form-control" id="input-password-confim" placeholder="Confirm Password" name="pconfirm" value={this.state.pconfirm} />
          </div>
          {/* USER TYPE RADIO BUTTONS  */}

          <div className="form-check">
          <input onChange={this.handleChange}  className="form-check-input" type="radio" name="user_type" id="exampleRadios1" value="owner"  />
            <label className="form-check-label" htmlFor="exampleRadios1">
              Owner
            </label>
          </div>
          <div className="form-check">
            <input onChange={this.handleChange} className="form-check-input" type="radio" name="user_type" id="exampleRadios2" value="manager" />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Manager
            </label>
          </div>
          <div className="form-check">
            <input onChange={this.handleChange} className="form-check-input" type="radio" name="user_type" id="exampleRadios3" value="employee" />
            <label className="form-check-label" htmlFor="exampleRadios3">
              Employee
            </label>
          </div>
          <div>
            <br></br>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>;
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

