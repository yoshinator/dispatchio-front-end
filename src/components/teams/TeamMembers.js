import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Sidebar from '../Sidebar';
import { getTeamMembersAction, setTeamMemberAction, changeTeamMemberEditFlagAction, createNewTeamMemberFlagAction} from '../../actions/team';
import withAuth from '../../hocs/withAuth'
import withRoleManager from '../../hocs/withRoleManager'

class TeamMembers extends Component {

  componentDidMount () {
    this.props.getTeamMembers(this.props.user.location.id);
  }
  handleClick =(teamMember) => {
    this.props.setTeamMemberAction(teamMember)
  }
  handleEdit = (teamMember) => {
    this.props.setTeamMemberAction(teamMember);
    this.props.changeTeamMemberEditFlag();

  }

  createNewTeamMember = () => {
    this.props.createNewTeamMemberFlag();
  }

  teamMembersJsx = () => {

    if (this.props.teamMembers.team_members && this.props.teamMembers.team_members.length > 0) {
      return this.props.teamMembers.team_members.map(teamMember => {
        return <div>
            {" "}
            <p key={teamMember.id} className="list-group-item">
              {teamMember.f_name} {teamMember.l_name} <span onClick={() => this.handleClick(teamMember)}>
                {" "}
                <Link to={`/map/${teamMember.id}`}>Locate</Link>
              </span>
              <button onClick={() => this.handleEdit(teamMember)} type="button" className="btn btn-primary float-right">
                {" "}
                Edit{" "}
              </button>
            </p>
          </div>;
      });
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

    if (!this.props.teamMembers.teamMemberEditFlag) {
      return <Sidebar>
          <main className="col">
          <button onClick={this.createNewTeamMember} className="mx-auto create-new-job" style={{ display: "block" }}>
            Create New Team Member{" "}
          </button>
            <div className="container">
              <div className="row">{this.renderTeamMembers()}</div>
            </div>
          </main>
        </Sidebar>;
    }else return <Redirect to="/editteammember"></Redirect>
  }
}

// PLEASE DESTRUCTURE THE STATE SO I DON'T HAVE TO THIS. `this.props.teamMembers.team_members`
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
    },
    changeTeamMemberEditFlag: ()=> {
      dispatch(changeTeamMemberEditFlagAction())
    },
    createNewTeamMemberFlag: () => {
      dispatch(createNewTeamMemberFlagAction())
    }
  };
}

export default withAuth(withRoleManager(connect(mapStateToProps, mapDispatchToProps)(TeamMembers)))