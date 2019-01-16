import { GET_TEAM_MEMBERS } from './types'

const initialState = {
  team_members: []
}

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAM_MEMBERS:
      return action.payload
    default:
      return state;
  }
}

export default teamReducer;


