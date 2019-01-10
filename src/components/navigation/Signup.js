import React from 'react'
import { connect } from 'react-redux'



export function Signup() {

  return <div className="card">
      <div className="card-body">
        <form>
          <div className="form-group">
            <label htmlFor="sign-up-f-name">First Name</label>
            <input type="email" className="form-control" id="sign-up-f-name" placeholder="First " />
          </div>
          <div className="form-group">
            <label htmlFor="sign-up-l-name">Last Name</label>
            <input type="email" className="form-control" id="sign-up-l-name" placeholder="Last " />
          </div>

          <div className="form-group">
            <label htmlFor="sign-up-email">Email address</label>
            <input type="email" className="form-control" id="sign-up-email" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="input-password">Password</label>
            <input type="password" className="form-control" id="input-password" placeholder="Password" />
          </div>

          <div className="form-group">
            <label htmlFor="input-password">Password Confirmation</label>
            <input type="password" className="form-control" id="input-password" placeholder="Confirm Password" />
          </div>

          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" name="user-type" id="user-type"/>
          <label htmlFor="user-type">Check if owner</label>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>;
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect (mapStateToProps)(Signup)

