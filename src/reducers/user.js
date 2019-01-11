import { LOGIN_USER, ADD_USER} from './types'

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
export default function user (state= initialState, action){
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case LOGIN_USER:
      return {};
    default: 
      return state;
  }
}