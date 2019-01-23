import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Sidebar from '../Sidebar'
import {
  getTeamsAction,
  changeTeamCreateFlagAction,
  changeTeamEditFlagAction
} from "../../actions/team";
import withAuth from '../../hocs/withAuth'
import withRoleManager from '../../hocs/withRoleManager'


const TeamUsers = ({users}) => {
 return users.map(user => {
   return <span>
       {" "}
     {user.f_name}, {user.l_name[0]} <span onClick={hello}>
         <i className="far fa-times-circle" />
       </span>
     </span>;
 })
}
const hello  = () => {
  debugger
}

class Teams extends Component {
  componentDidMount(){
    if (this.props.user){
      this.props.getTeam(this.props.user.location.id);
    }
  }


 
  teamsJsx = () => {
    if (this.props.teams&& this.props.teams.length > 0){
      return this.props.teams.map(team => 
          <p className="list-group-item">{team.name} <TeamUsers users={team.users}></TeamUsers>   <button
          type="button"
          onClick={() => this.handleAdd()}
          className="btn btn-primary float-right">
          Add
          </button></p>
          
        );
    }
  }

  handleAdd = () =>{
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
          <button onClick={this.handleClick} className="mx-auto create-new-job" style={{ display: "block" }}>
            Create New Team{" "}
          </button>
          <div className="container">
            <div className="row">
              {this.renderTeams()}
            </div>
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