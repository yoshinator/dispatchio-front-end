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
    if (this.props.teams.teams&& this.props.teams.teams.length > 0){
      return this.props.teams.teams.map(team => 
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
          <div className="container">
            <div className="row">
              {this.renderTeams()}
            </div>
          </div>
        </main>
      </Sidebar>;
  }

}

const mapStateToProps = (state) => ({
  teams: state.teamReducer,
  jobs: state.jobReducer,
  user: state.loginReducer.user
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