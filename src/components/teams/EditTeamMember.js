import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTeamMemberAction } from '../../actions/team';
import Sidebar from '../Sidebar';
import { Redirect } from 'react-router-dom';


class EditTeamMember extends Component {
  state ={
    f_name: "",
    l_name: "",
    phone: "",
    email: "",
    user_type: ""
  }

  componentDidMount () {
    this.setState({
      ...this.props.team_member
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.updateTeamMember(this.state, this.state.id)
  }
  render() {
    if (this.props.teamMemberEditFlag) {
      return <Sidebar>
          <div>
            <h2 >EDIT EMPLOYEE INFO</h2>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label htmlFor="name">First Name</label>
                  <input onChange={this.handleChange} type="text" name="f_name" id="f_name" value={this.state.f_name} />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Last Name</label>
                  <input onChange={this.handleChange} type="text" name="l_name" id="l_name" value={this.state.l_name} />
                </div>

                <div>
                  <label htmlFor="phone">Phone</label>
                  <input onChange={this.handleChange} type="phone" name="phone" id="phone" value={this.state.phone} />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input onChange={this.handleChange} type="email" name="email" id="email" value={this.state.email} />
                </div>

                <div>
                  <label htmlFor="teamMemberType">Team Member Type</label>
                  <select onChange={this.handleChange}name="user_type" id="user_type">
                    <option value="" selected></option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>

                <button type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
        </Sidebar>;
    }
    else return <Redirect to="/teammembers"></Redirect>
  }
}



const mapStateToProps = ({ teamMemberReducer: team_member}) => {
  return team_member
}

const mapDispatchToProps = (dispatch) => {
  return { updateTeamMember: (teamMember, id) =>{
    dispatch(updateTeamMemberAction(teamMember, id))
  } };
}

export default connect(mapStateToProps,mapDispatchToProps)(EditTeamMember)
