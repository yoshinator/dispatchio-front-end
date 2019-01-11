import { ADD_COMPANY, ADD_LOCATION, ADD_CUSTOMER , } from './types'

const initialState = {
  users: [],
  jobs: [],
  customers: [],
  customer: null,
  teams: [],
  team: null,
  company: null,
  locations: [],
  location: null
};

export default function reducer(state = initialState, action) {
  switch(action.type) {

    
    case ADD_COMPANY: 
      return {...state, company: action.payload}
    
    case ADD_LOCATION: 
      return {...state, locations: [...state.locations, action.payload]}
    
    case ADD_CUSTOMER:
      return {...state, customers: [...state.customers, action.payload]}

    
    default: 
      return state
  }
}
