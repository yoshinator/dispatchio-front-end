import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withAuth from '../../hocs/withAuth';
import withRoleManager from '../../hocs/withRoleManager';
import { addMemberToTeamAction } from "../../actions/team";

class EditTeam extends Component {
  state = {
    name: "",
    location_id: "",
    team_id: "",
    user_id: ""
  }

  componentDidMount() {
    this.setState({
      location_id: this.props.user.location.id,
      team_id: this.props.team.id
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  getTeamMembers = () => {
    return this.props.team_members.map(member => {
      return <option key={member.id} value={member.id}> {member.f_name}, {member.l_name}</option>
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addMemberToTeam(this.state)
  }
  render() {
    if (this.props.editingTeam) {

      return (
        <div>
          <h2>
            Add Team Members to Team {this.props.team.name}
                </h2>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="team-member-select">
                  Choose Team Member to add.
                      </label>
                <select onChange={this.handleChange} name="user_id" id="user_id" >
                  <option value=""></option>
                  {this.getTeamMembers()}
                  </select>
                  </div>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      )
    }
    else return <Redirect to="/teams"></Redirect>
  }
}

export const mapStateTopProps = ({ teamReducer: { team, creatingTeam, editingTeam }, teamMemberReducer: {team_members}, loginReducer: { user } }) => {
  return {
    team,
    creatingTeam,
    editingTeam,
    team_members,
    user
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addMemberToTeam: (body) => {
      dispatch(addMemberToTeamAction(body));
    }
  }

}
export default withRoleManager(withAuth(connect(mapStateTopProps, mapDispatchToProps)(EditTeam))
);