import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Sidebar from '../Sidebar'
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
 return users.map(user => {
   return <span >
       {" "}
     {user.f_name}, {user.l_name[0]} <span onClick={() => removeUser(user.id, teamId)}>
         <i className="far fa-times-circle" />
       </span>
     </span>;
 })
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
        <p key={team.id} className="list-group-item no-cursor">
          {team.name} <i class="fas fa-bars" /> Team Members: 
          <TeamUsers
            users={team.users}
            removeUser={this.removeUser}
            teamId={team.id}
          />{" "}
          <button
            type="button"
            onClick={() => this.handleAdd(team)}
            className="btn btn-primary float-right"
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
      <div className="col-sm">
        <div className="list-group">
          <span className="list-group-item list-group-item-action active">
            Teams
      </span>
          {this.teamsJsx()}
        </div>
      </div>
    )
  }

  handleClick = () => {
    this.props.createTeamFlag();
  }

    render() {
      if (!this.props.editingTeam && !this.props.creatingTeam)
      return <Sidebar>
          <main className="col">
            <button onClick={this.handleClick} className="mx-auto create-new-button" style={{ display: "block" }}>
              <span>Create New Team</span>{" "}
            </button>
            <div className="container">
              <div className="row">{this.renderTeams()}</div>
            </div>
          </main>
        </Sidebar>;
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