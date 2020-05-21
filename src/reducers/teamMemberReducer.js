import {
  GET_TEAM_MEMBERS,
  SET_TEAM_MEMBER,
  EDIT_TEAM_MEMBER,
  CHANGE_TEAM_MEMBER_EDIT_FLAG,
  CREATE_TEAM_MEMBER_FLAG,
  CREATE_TEAM_MEMBER,
  CREATE_EDIT_MEMBER_FALSE
} from "./types";

const initialState = {
  team_members: null,
  team_member: {},
  teamMemberEditFlag: false,
  createTeamMemberFlag: false,
}

const teamMemberReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAM_MEMBERS:
      return {...state, team_members: action.payload}
    
    case SET_TEAM_MEMBER: 
      return {...state, team_member: action.payload}

    case CHANGE_TEAM_MEMBER_EDIT_FLAG: 
      return {...state, teamMemberEditFlag: true}


    case CREATE_EDIT_MEMBER_FALSE:
      return { ...state, teamMemberEditFlag: false, createTeamMemberFlag: false }
    
    case EDIT_TEAM_MEMBER:
      return {
        team_members: state.team_members
          .filter(team_member => team_member.id !== action.payload.id)
          .concat(
            action.payload
          ), team_member: initialState.team_member, teamMemberEditFlag: false };

    case CREATE_TEAM_MEMBER_FLAG:
      return { ...state, createTeamMemberFlag: true }

    case CREATE_TEAM_MEMBER:
      return { ...state, team_members: [...state.team_members, action.payload], createTeamMemberFlag: false }
      
    default:
      return state;
  }
}

export default teamMemberReducer;


