import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  getTeamsAction,
  changeTeamCreateFlagAction,
  changeTeamEditFlagAction,
  setTeamAction,
  removeTeamMemberFromTeam
} from "../../actions/team";
import withAuth from '../../hocs/withAuth'
import withRoleManager from '../../hocs/withRoleManager'


const TeamUsers = ({ users, removeUser, teamId}) => {
  if (users.length > 0){
 return users.map(user => {
   return <p >
       {" "}
     {user.f_name}, {user.l_name[0]}. <span onClick={() => removeUser(user.id, teamId)}><i class="fas fa-trash"></i>
       </span> |
     </p>;
 })
}
}

class Teams extends Component {
  componentDidMount(){
    if (this.props.user){
      this.props.getTeam(this.props.user.location.id);
    }
  }
  
  removeUser  = (userId, teamId ) => {
    const body ={
      user_id: userId, 
      team_id: teamId
    }
    this.props.removeTeamMemberFromTeam(body) 
  }
 
  teamsJsx = () => {
    if (this.props.teams&& this.props.teams.length > 0){
      return this.props.teams.map(team => (
        <p className="card-content" key={team.id}>
          <h2>{team.name} Team</h2>
          <TeamUsers
            users={team.users}
            removeUser={this.removeUser}
            teamId={team.id}
          />{" "}
          <button className="button"
            type="button"
            onClick={() => this.handleAdd(team)}
          >
            Add
          </button>
        </p>
      ));
    }
  }

  handleAdd = (team) =>{
    this.props.setTeam(team)
    this.props.editTeamFlag()
  }

  renderTeams = () => {
    return(
        <div className="card">
          <h2>Teams</h2>
          {this.teamsJsx()}
        </div>
    )
  }

  handleClick = () => {
    this.props.createTeamFlag();
  }

    render() {
      if (!this.props.editingTeam && !this.props.creatingTeam)
      return (
          <main className="container">
            <div className="form-container">
              <div className="jobs">{this.renderTeams()}</div>
            </div>
            <button className="button" onClick={this.handleClick}>
            Create New Team
            </button>
          </main>
      )
      else if (this.props.creatingTeam){
        return <Redirect to="/createteam"></Redirect>
      }else if (this.props.editingTeam){
        return <Redirect to="/editteam"></Redirect>
      }
  }

}

const mapStateToProps = ({teamReducer: {teams, team, editingTeam, creatingTeam }, jobReducer: {jobs}, loginReducer: {user}}) => ({
  teams,
  team, 
  editingTeam,
  creatingTeam,
  jobs,
  user
})

const mapDispatchToProps = (dispatch) => {
  return {
    getTeam: (location_id) => {
      dispatch(getTeamsAction(location_id));
    },
    createTeamFlag: ()=> {
      dispatch(changeTeamCreateFlagAction());
    },
    editTeamFlag: () => {
      dispatch(changeTeamEditFlagAction());
    },
    setTeam: (team) => {
      dispatch(setTeamAction(team))
    },
    removeTeamMemberFromTeam: (id, teamId ) => {
      dispatch(removeTeamMemberFromTeam(id, teamId));
    }

  }
}

export default withAuth(
  withRoleManager(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Teams)
  )
);