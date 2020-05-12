import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
      return (
        <div className="container">
          <h2>
            Create New TeamMember
                </h2>
          <div className="form-container">
            <div className="form">
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="f_name">First Name</label>
                <input onChange={this.handleChange} type="text" name="f_name" id="f_name" value={this.state.f_name} />
                <label htmlFor="l_name">Last Name</label>
                <input onChange={this.handleChange} type="text" name="l_name" id="l_name" value={this.state.l_name} />     
                <label htmlFor="phone">Phone</label>
                <input onChange={this.handleChange} type="phone" name="phone" id="phone" value={this.state.phone} />
                <label htmlFor="email"> email</label>
                <input onChange={this.handleChange} type="email" name="email" id="email" value={this.state.email} />
                <label htmlFor="password"> Password</label>
                <input onChange={this.handleChange} type="password" name="password" id="password" value={this.state.password} />
                <label htmlFor="password_c"> Confirm password</label>
                <input onChange={this.handleChange} type="password" name="password_c" id="password_c" value={this.state.password_c} />

                <label htmlFor="jobPaymentSelect">
                  Team Member Type
                      </label>
                <select onChange={this.handleChange} name="user_type" id="user_type" >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </select>
              <button className="button" type="submit">Create</button>
            </form>
            </div>
          </div>
        </div>
      )
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