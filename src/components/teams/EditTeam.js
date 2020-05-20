import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withAuth from '../../hocs/withAuth';
import withRoleManager from '../../hocs/withRoleManager';
import { addMemberToTeamAction } from "../../actions/team";
import { relativeTimeThreshold } from 'moment';

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
    console.log(this.props)
    if (this.props.team_members){
      return this.props.team_members.map(member => {
        return <option key={member.id} value={member.id}> {member.f_name}, {member.l_name}</option>
      })
    } return null

  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addMemberToTeam(this.state)
  }
  render() {
    if (this.props.editingTeam) {

      return (
        <div className="container">
          <h2>
            Add Team Members to Team {this.props.team.name}
                </h2>
          <div className="form-container">
            <div className="form">
              <form onSubmit={this.handleSubmit}>
                  <label htmlFor="team-member-select">
                    Choose Team Member to add.
                        </label>
                  <select onChange={this.handleChange} name="user_id" id="user_id" >
                    <option value=""></option>
                    {this.getTeamMembers()}
                    </select>
                <button className="button" type="submit">Add Team Member</button>
              </form>
            </div>
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