import { SHOW_JOB, GET_JOBS } from './types'

const initialState = {
jobs: []
}


const jobsReducer = (state = initialState, action) => {
  console.log("In jobsReducer", action.payload)
  switch (action.type) {
    //expecting job object
    case SHOW_JOB:
      return { ...state, jobs: [...state.jobs.slice(0), action.payload] };
    case GET_JOBS:
      console.log(" In Get jobs of jobsReducer")
      return { ...initialState, jobs: action.payload }
    default:
      return state;
  }

}

export default jobsReducer;

