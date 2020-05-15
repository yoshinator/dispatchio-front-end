import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setTeamMemberAction, changeTeamMemberEditFlagAction, createNewTeamMemberFlagAction} from '../../actions/team';
import withAuth from '../../hocs/withAuth'
import withRoleManager from '../../hocs/withRoleManager'

const TeamMembers = (props) =>  {

  const handleClick =(teamMember) => {
    props.setTeamMemberAction(teamMember)
  }
  const handleEdit = (teamMember) => {
    props.setTeamMemberAction(teamMember);
    props.changeTeamMemberEditFlag();

  }

  const teamMembersJsx = () => {
    if (props.teamMembers.team_members && props.teamMembers.team_members.length > 0) {
      return props.teamMembers.team_members.map(teamMember => {
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


  if (!props.teamMembers.teamMemberEditFlag && !props.teamMembers.createTeamMemberFlag) {
    console.log(props.teamMembers.teamMemberEditFlag)
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
  } else if (props.teamMembers.createTeamMemberFlag) { 
    return <Redirect to="/createteammember"></Redirect>
  }
    else {return <Redirect to="/editteammember"></Redirect>
  }

} 

// PLEASE DESTRUCTURE THE STATE SO I DON'T HAVE TO  `props.teamMembers.team_members`
const mapStateToProps = (state) => ({
  user: state.loginReducer.user,
  teamMembers: state.teamMemberReducer
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
    }
  };
}

export default withAuth(withRoleManager(connect(mapStateToProps, mapDispatchToProps)(TeamMembers)))