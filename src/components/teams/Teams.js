import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../Sidebar'
import { getTeamsAction } from '../../actions/team'
import withAuth from '../../hocs/withAuth'
import withRoleManager from '../../hocs/withRoleManager'


class Teams extends Component {
  componentDidMount(){
    if (this.props.user){
      this.props.getTeam(this.props.user.location.id);
    }
  }


 
  teamsJsx = () => {
    if (this.props.teams&& this.props.teams.length > 0){
      return this.props.teams.map(team => 
          <p className="list-group-item">{team.name}</p>
        );
    }
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

    render() {
      return <Sidebar>
        <main className="col">
          <button onClick={this.createNewTeamMember} className="mx-auto create-new-job" style={{ display: "block" }}>
            Create New Team{" "}
          </button>
          <div className="container">
            <div className="row">
              {this.renderTeams()}
            </div>
          </div>
        </main>
      </Sidebar>;
  }

}

const mapStateToProps = ({teamReducer: {teams}, jobReducer: {jobs}, loginReducer: {user}}) => ({
  teams,
  jobs,
  user
})

const mapDispatchToProps = (dispatch) => {
  return {
    getTeam: (location_id) => {
      dispatch(getTeamsAction(location_id));
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