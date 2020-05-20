import { GET_TEAMS, SET_TEAM, CHANGE_TEAM_EDIT_FLAG, EDIT_TEAM, CHANGE_TEAM_CREATE_FLAG, CREATE_TEAM } from './types'

const initialState = {
 teams: null,
 team: {},
 editingTeam: false,
 creatingTeam: false, 
}

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAMS:
      return {...state, teams: action.payload}
   
    case SET_TEAM: 
      return { ...state, team: action.payload }
   
    case CHANGE_TEAM_EDIT_FLAG:
      return { ...state, editingTeam: true }

    case EDIT_TEAM:
      return {
        teams: state.teams
          .filter(team => team.id !== action.payload.id)
          .concat(
            action.payload
          ), team: initialState.team, editingTeam: false
      };
      case CHANGE_TEAM_CREATE_FLAG:
        return { ...state, creatingTeam: true }

      case CREATE_TEAM:
        return { ...state, teams: [...state.teams, action.payload], creatingTeam: false }
      
      default:
        return state;
  }
}

export default teamReducer;


