import { ADD_USER, SET_CURRENT_USER, AUTHENTICATING_USER, AUTHENTICATED_USER, FAILED_LOGIN, LOG_OUT} from './types'

const initialState = {
  JWTToken: "",
  authenticatingUser: false,
  loggedIn: false,
  failedLogin: false,
  user: null,
  error: ""
}
const  loginReducer = (state = initialState, action) => {
  switch (action.type) {
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

    case LOG_OUT:
      console.log("IN loginReducer", state)
      return initialState;

    default:
      console.log("In default case")
      return state;
  }
}

export default loginReducer



