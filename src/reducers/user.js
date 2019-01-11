import { ADD_USER, SET_CURRENT_USER, AUTHENTICATING_USER, AUTHENTICATED_USER, FAILED_LOGIN} from './types'

const initialState = {
  user : {
    JWTToken: "",
    authenticatingUser: false,
    loggedIn: false,
    failedLogin: false,
    user: null,
    error: ""
  }
}
const  user = (state = initialState, action) => {
  switch (action.type) {
    // TODO: move to types
    case SET_CURRENT_USER:
      //action.payload { username: 'Chandler Bing', bio: 'my user bio', avatar: 'some image url' }
      return { ...state, user: action.payload, loggedIn: true, authenticatingUser: false }
    case AUTHENTICATING_USER: //tells the app we're fetching
      return { ...state, authenticatingUser: true }
    case AUTHENTICATED_USER:
      return { ...state, authenticatingUser: false }
    case FAILED_LOGIN: //for error handling
      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      }
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state
  }
}

export default user



