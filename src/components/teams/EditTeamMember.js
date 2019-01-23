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
          <div className="card inner-card">
            <h2 className="job-edit-title">EDIT EMPLOYEE INFO</h2>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">First Name</label>
                  <input onChange={this.handleChange} type="text" className="form-control" name="f_name" id="f_name" value={this.state.f_name} />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Last Name</label>
                  <input onChange={this.handleChange} type="text" className="form-control" name="l_name" id="l_name" value={this.state.l_name} />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input onChange={this.handleChange} type="phone" className="form-control" name="phone" id="phone" value={this.state.phone} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input onChange={this.handleChange} type="email" className="form-control" name="email" id="email" value={this.state.email} />
                </div>

                <div className="form-group">
                  <label htmlFor="teamMemberType">Team Member Type</label>
                  <select onChange={this.handleChange} className="form-control" name="user_type" id="user_type">
                    <option value="" selected></option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>

                <button type="submit" class="btn btn-primary">
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
