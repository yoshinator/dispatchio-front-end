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
        return <div key={Date.now()*Math.random()}>
            {" "}
            <p key={teamMember.id}>
              {teamMember.f_name} {teamMember.l_name} <span onClick={() => this.handleClick(teamMember)}>
                {" "}
                <Link to={`/map/${teamMember.id}`}>Locate</Link>
              </span>
              <button onClick={() => this.handleEdit(teamMember)} type="button">
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
      <div>
        <div>
          <span>
            Team Members
      </span>
          {this.teamMembersJsx()}
        </div>
      </div>
    )
  }

  render() {

    if (!this.props.teamMembers.teamMemberEditFlag && !this.props.teamMembers.createTeamMemberFlag) {
      return <Sidebar>
          <main>
          <button onClick={this.createNewTeamMember} >
            <span>Add Team Member</span>{" "}
          </button>
            <div>
              <div>{this.renderTeamMembers()}</div>
            </div>
          </main>
        </Sidebar>;
    } else if (this.props.teamMembers.createTeamMemberFlag) { 
      return <Redirect to="/createteammember"></Redirect>
    }
      else {return <Redirect to="/editteammember"></Redirect>
    }
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