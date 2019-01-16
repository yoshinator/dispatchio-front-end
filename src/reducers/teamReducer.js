import { GET_TEAMS } from './types'

const initialState = {
 teams: []
}

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAMS:
      return action.payload
    default:
      return state;
  }
}

export default teamReducer;


