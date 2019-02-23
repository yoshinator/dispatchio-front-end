import { GET_COMPANIES, ADD_COMPANY } from './types'

const initialState = {
  companies: []
}

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_COMPANIES:
      return { ...initialState, companies:  action.payload };

      case ADD_COMPANY: 
        return {...state, companies: [...state.companies, action.payload]}
    default:
      return state;
      
  }
}

export default companiesReducer