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
        <div>
          <h2>
            Create New TeamMember
                </h2>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="f_name">First Name</label>
                <input onChange={this.handleChange} type="text" name="f_name" id="f_name" value={this.state.f_name} />
              </div>
              <div>
                <label htmlFor="l_name">Last Name</label>
                <input onChange={this.handleChange} type="text" name="l_name" id="l_name" value={this.state.l_name} />
              </div>     
              <div>
                <label htmlFor="phone">Phone</label>
                <input onChange={this.handleChange} type="phone" name="phone" id="phone" value={this.state.phone} />
              </div>
              <div >
                <label htmlFor="email"> email</label>
                <input onChange={this.handleChange} type="email" name="email" id="email" value={this.state.email} />
              </div>
              <div>
                <label htmlFor="password"> Password</label>
                <input onChange={this.handleChange} type="password" name="password" id="password" value={this.state.password} />
              </div>
              <div>
                <label htmlFor="password_c"> Confirm password</label>
                <input onChange={this.handleChange} type="password" name="password_c" id="password_c" value={this.state.password_c} />
              </div>

              <div>
                <label htmlFor="jobPaymentSelect">
                  Team Member Type
                      </label>
                <select onChange={this.handleChange} name="user_type" id="user_type" >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </select>
                </div>
              <button type="submit">Create</button>
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