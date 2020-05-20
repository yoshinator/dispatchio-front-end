import React from 'react'
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


const TeamUsers = ({ users, removeUser, teamId, getTeam, user}) => {
  if (users.length > 0){
    return users.map(user => {
      return <p key={user.id}>
          {" "}
        {user.f_name}, {user.l_name[0]}. <span onClick={() => removeUser(user.id, teamId)}><i className="fas fa-trash"></i>
          </span> |
        </p>;
    })
  } else {
    return <div></div>
  }
}

const Teams = (props) => {
  
  if (!props.teams){
    props.getTeams(props.user.location.id)
  }

  const removeUser  = (userId, teamId ) => {
    const body ={
      user_id: userId, 
      team_id: teamId
    }
    props.removeTeamMemberFromTeam(body) 
  }

  const teamsJsx = () => {
    if (props.teams && props.teams.length > 0){
      return props.teams.map(team => (
        <div className="card-content" key={team.id}>
          <h2>{team.name} Team</h2>
          <TeamUsers
            users={team.users}
            removeUser={removeUser}
            teamId={team.id}
          />
          <button className="button"
            type="button"
            onClick={() => handleAdd(team)}
          >
            Add Member to Team
          </button>
        </div>
      ));
    }
  }

  const handleAdd = (team) =>{
    props.setTeam(team)
    props.editTeamFlag()
  }

  const renderTeams = () => {
    return(
        <div className="card">
          <h2>Teams</h2>
          {teamsJsx()}
        </div>
    )
  }

  const handleClick = () => {
    props.createTeamFlag();
  }

  if (!props.editingTeam && !props.creatingTeam){
    return (
      <main className="container">
        <div className="form-container">
          <div className="jobs">{renderTeams()}</div>
        </div>
        <button className="button" onClick={handleClick}>
        Create New Team
        </button>
      </main>
    )}
    else if (props.creatingTeam){
      return <Redirect to="/createteam"></Redirect>
    }else if (props.editingTeam){
      return <Redirect to="/editteam"></Redirect>
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
    createTeamFlag: ()=> {
      dispatch(changeTeamCreateFlagAction());
    },
    getTeams: (locationId) => {
      dispatch(getTeamsAction(locationId))
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