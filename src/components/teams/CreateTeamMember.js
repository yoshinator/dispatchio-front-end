import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Sidebar from '../Sidebar';
import withAuth from '../../hocs/withAuth';
import withRoleManager from '../../hocs/withRoleManager';
import { createTeamMemberAction } from '../../actions/team'

class CreateTeamMember extends Component {
  state = {
    f_name: "",
    l_name: "",
    phone: "",
    email: "",
    user_type: "",
    password: "",
    password_c: "",
    location_id: ""
  }

  componentDidMount() {
    this.setState({
      location_id: this.props.user.location.id
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.password === this.state.password_c){
      this.props.createTeamMember(this.state)
    } else {
      alert("passwords do not match")
      return null
    }
  }


  render() {

    if (this.props.createTeamMemberFlag) {
      return <Sidebar>
        <div className="card inner-card">
          <h2 className="customer-title">
            Create New TeamMember
                </h2>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="f_name">First Name</label>
                <input onChange={this.handleChange} type="text" className="form-control" name="f_name" id="f_name" value={this.state.f_name} />
              </div>
              <div className="form-group">
                <label htmlFor="l_name">Last Name</label>
                <input onChange={this.handleChange} type="text" className="form-control" name="l_name" id="l_name" value={this.state.l_name} />
              </div>     
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input onChange={this.handleChange} type="phone" className="form-control" name="phone" id="phone" value={this.state.phone} />
              </div>
              <div className="form-group">
                <label htmlFor="email"> email</label>
                <input onChange={this.handleChange} type="email" className="form-control" name="email" id="email" value={this.state.email} />
              </div>
              <div className="form-group">
                <label htmlFor="password"> Password</label>
                <input onChange={this.handleChange} type="password" className="form-control" name="password" id="password" value={this.state.password} />
              </div>
              <div className="form-group">
                <label htmlFor="password_c"> Confirm password</label>
                <input onChange={this.handleChange} type="password" className="form-control" name="password_c" id="password_c" value={this.state.password_c} />
              </div>

              <div className="form-group">
                <label htmlFor="jobPaymentSelect">
                  Team Member Type
                      </label>
                <select onChange={this.handleChange} className="form-control" name="state" id="state" >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </select>
                </div>
              <button type="submit" class="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </Sidebar>
    }
    else return <Redirect to="/teammembers"></Redirect>
  }
}

export const mapStateTopProps = ({ teamMemberReducer: { team_member, createTeamMemberFlag }, loginReducer: { user } }) => {
  return {
    team_member,
    createTeamMemberFlag,
    user
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    createTeamMember: (body) => {
      dispatch(createTeamMemberAction(body))
    }
  }

}
export default withRoleManager(withAuth(connect(mapStateTopProps, mapDispatchToProps)(CreateTeamMember))
);