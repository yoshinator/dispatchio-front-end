import {LOGIN_USER} from '../reducers/types'

export function loginAction(email, password){
  return {
    type: LOGIN_USER,
    payload: {email, password}
    
  }
}
