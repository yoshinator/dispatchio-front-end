import { GET_COMPANIES } from './types'

const initialState = {
  companies: []
}

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_COMPANIES:
      return { ...initialState, companies:  action.payload };
    default:
      return state;
      
  }
}

export default companiesReducer