import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../Sidebar'
import { getTeamsAction } from '../../actions/team'


class Teams extends Component {
  componentDidMount(){
    this.props.getTeam(this.props.user.location.id);
  }


 
  teamsJsx = () => {
    if (this.props.teams && this.props.teams.length > 0){
      return this.props.teams.map(team => 
          <a href="#" className="list-group-item">{team.name}</a>
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
  jobs: state.weekViewReducer,
  user: state.loginReducer.user
})

const mapDispatchToProps = (dispatch) => {
  return {
    getTeam: (location_id) => {
      dispatch(getTeamsAction(location_id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams)