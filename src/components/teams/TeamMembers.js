import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../Sidebar';
import { getTeamMembersAction } from '../../actions/team';

class TeamMembers extends Component {

  componentDidMount () {
    this.props.getTeamMembers(this.props.user.location.id);
  }

  teamMembersJsx = () => {
    console.log("%cPROPSSSS", 'color: goldenrod', this.props)
    if (this.props.teamMembers && this.props.teamMembers.length > 0) {
      return this.props.teamMembers.map(teamMember =>
        <a href="#" className="list-group-item">{teamMember.f_name}</a>
      );
    }
  }

  renderTeamMembers = () => {
    return (
      <div className="col-sm">
        <div className="list-group">
          <span className="list-group-item list-group-item-action active">
            Team Members
      </span>
          {this.teamMembersJsx()}
        </div>
      </div>
    )
  }

  render() {
    return <Sidebar>
        <main className="col">
          <div className="container">
            <div className="row">{this.renderTeamMembers()}</div>
          </div>
        </main>
      </Sidebar>;
  }
}


const mapStateToProps = (state) => ({
  user: state.loginReducer.user,
  teamMembers: state.teamMemberReducer
})

const mapDispatchToProps = (dispatch) => {
  return {
    getTeamMembers: (location_id) => {
      dispatch(getTeamMembersAction(location_id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembers)