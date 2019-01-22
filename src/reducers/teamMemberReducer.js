import { GET_TEAM_MEMBERS, SET_TEAM_MEMBER } from './types'

const initialState = {
  team_members: [],
  team_member: {}
}

const teamMemberReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAM_MEMBERS:
      return action.payload
    case SET_TEAM_MEMBER: 
      return {...state, team_member: action.payload}
    default:
      return state;
  }
}

export default teamMemberReducer;


