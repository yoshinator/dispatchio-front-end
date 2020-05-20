import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setTeamMemberAction, changeTeamMemberEditFlagAction, createNewTeamMemberFlagAction, getTeamMembersAction} from '../../actions/team';
import withAuth from '../../hocs/withAuth'
import withRoleManager from '../../hocs/withRoleManager'

const TeamMembers = (props) =>  {

  if (!props.teamMemberReducer.team_members){
    props.getTeamMembers(props.user.location.id)
  }

  const handleClick =(teamMember) => {
    props.setTeamMemberAction(teamMember)
  }

  const handleEdit = (teamMember) => {
    props.setTeamMemberAction(teamMember);
    props.changeTeamMemberEditFlag();
  }

  const teamMembersJsx = () => {
    if (props.teamMemberReducer.team_members) {
      return props.teamMemberReducer.team_members.map(teamMember => {
        return <div key={Date.now()*Math.random()}>
            {" "}
            <p className= "card-content" key={teamMember.id}>
              {teamMember.f_name} {teamMember.l_name} <span onClick={() => handleClick(teamMember)}>
                {" "}
              <Link to={`/map/${teamMember.id}`}><i className="fas fa-map-marker-alt"></i></Link>
              </span>
              <button className="button" onClick={() => handleEdit(teamMember)} type="button">
                {" "}
                Edit{" "}
              </button>
            </p>
          </div>;
      });
    }
  }


  if (!props.teamMemberReducer.teamMemberEditFlag && !props.teamMemberReducer.createTeamMemberFlag) {
    return (
        <main className="container">
          <div className="form-container">
          <div>          
            <h2>Team Members</h2>
            {teamMembersJsx()}</div>
          </div>
        <button className="button" onClick={props.createNewTeamMemberFlag} >
          <span>Add Team Member</span>
        </button>
        </main>
    )
  } else if (props.teamMemberReducer.createTeamMemberFlag) { 
    return <Redirect to="/createteammember"></Redirect>
  }
    else {return <Redirect to="/editteammember"></Redirect>
  }

} 

// PLEASE DESTRUCTURE THE STATE SO I DON'T HAVE TO  `props.teamMembers.team_members`
const mapStateToProps = (state) => ({
  user: state.loginReducer.user,
  teamMemberReducer: state.teamMemberReducer
})

const mapDispatchToProps = (dispatch) => {
  return {
    setTeamMemberAction: (teamMember) =>{
      dispatch(setTeamMemberAction(teamMember))
    },
    changeTeamMemberEditFlag: ()=> {
      dispatch(changeTeamMemberEditFlagAction())
    },
    createNewTeamMemberFlag: () => {
      dispatch(createNewTeamMemberFlagAction())
    },
    getTeamMembers: (locationId) => {
      dispatch(getTeamMembersAction(locationId))
    }
  };
}

export default withAuth(withRoleManager(connect(mapStateToProps, mapDispatchToProps)(TeamMembers)))