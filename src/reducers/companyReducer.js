import { ADD_LOCATION, } from './types'

const initialState = {
  users: [],
  phone: "",
  website: "",
  name: "",
  locations: [],

};

export default function companyReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_LOCATION: 
      return {...state, locations: [...state.locations, action.payload]}    
    default: 
      return state
  }
}
