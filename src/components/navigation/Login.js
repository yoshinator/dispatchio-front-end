import React from 'react'
import { connect } from  'redux'

export function Login() {
  return <div className="card">
      <div className="card-body">
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label htmlFor="input-password">Password</label>
            <input type="password" class="form-control" id="input-password" placeholder="Password" />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
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

export default connect(mapStateToProps)(Signup)