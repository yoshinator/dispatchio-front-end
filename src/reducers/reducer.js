import {ADD_USER, ADD_COMPANY, ADD_LOCATION, ADD_CUSTOMER } from './types'

const initialState = {
  authToken: "",
  users: [],
  user: {},
  jobs: [],
  customers: [],
  customer: {},
  teams: [],
  team: {},
  company: {},
  locations: [],
  location: {}
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case ADD_USER:
      return {...state, users: [...state.users, action.payload]}
    
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
