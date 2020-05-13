import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTeamMembersAction, setTeamMemberAction, changeTeamMemberEditFlagAction, createNewTeamMemberFlagAction} from '../../actions/team';
import withAuth from '../../hocs/withAuth'
import withRoleManager from '../../hocs/withRoleManager'

const TeamMembers = (props) =>  {


  props.getTeamMembers(props.user.location.id);

  const handleClick =(teamMember) => {
    props.setTeamMemberAction(teamMember)
  }
  const handleEdit = (teamMember) => {
    props.setTeamMemberAction(teamMember);
    props.changeTeamMemberEditFlag();

  }

  const createNewTeamMember = () => {
    props.createNewTeamMemberFlag();
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

  const renderTeamMembers = () => {
    return (
        <div>
          <h2>
            Team Members
          </h2>
          {teamMembersJsx()}
        </div>
   
    )
  }

  if (!props.teamMembers.teamMemberEditFlag && !props.teamMembers.createTeamMemberFlag) {
    return (
        <main className="container">
          <div className="form-container">
            <div>{renderTeamMembers()}</div>
          </div>
        <button className="button" onClick={createNewTeamMember} >
          <span>Add Team Member</span>{" "}
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