import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Sidebar from '../Sidebar';
import { getTeamMembersAction } from '../../actions/team';
import { setTeamMemberAction } from "../../actions/team";
import withAuth from '../../hocs/withAuth'
import withRoleManager from '../../hocs/withRoleManager'

class TeamMembers extends Component {

  componentDidMount () {
    this.props.getTeamMembers(this.props.user.location.id);
  }
  handleClick =(teamMember) => {
    this.props.setTeamMemberAction(teamMember)
  }

  teamMembersJsx = () => {
    if (this.props.teamMembers && this.props.teamMembers.length > 0) {
      return this.props.teamMembers.map(teamMember => <div onClick={() => this.handleClick(teamMember)}>
          {" "}
          <p key={teamMember.id} className="list-group-item">
            {teamMember.f_name} {teamMember.l_name} <Link
              to={`/map/${teamMember.id}`}
            >
              Locate
            </Link>
          </p>
        </div>);
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
    },
    setTeamMemberAction: (teamMember) =>{
      dispatch(setTeamMemberAction(teamMember))
    }
  };
}

export default withAuth(withRoleManager(connect(mapStateToProps, mapDispatchToProps)(TeamMembers)))