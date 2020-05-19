import { ADD_JOB, EDIT_JOB, GET_JOBS, UPDATE_JOB, GET_WEEK, CREATE_JOB_FLAG, CREATE_JOB} from './types'

const initialState = {
  jobs: [],
  editingJob: {},
  jobForm: false,
  createJobFlag: false
}


const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    //Adds one job to the end of jobs array job object
    case ADD_JOB:
      return { ...state, jobs: [...state.jobs.slice(0), action.payload] };
      //GET JOBS FOR EMPLOYEE VIEW ONLY
    case GET_JOBS:
      return { ...state, jobs: action.payload }
      //jobs gets overwritten with action.payload which should be all the jobs in a 7 day period.
    case GET_WEEK:
      return  {jobs: [...initialState.jobs, ...action.payload], editingJob: {...state.editingJob}, jobForm: false, createJob: false}
      //jobs array keeps old state editingJob gets the value of a selected jobObject which is what renders to editjob form
    case EDIT_JOB:
      return { jobs: [...state.jobs], editingJob: action.payload, jobForm: true }
      //replaces the updated job in our state's jobs array.
    case UPDATE_JOB:
       return { jobs: state.jobs.filter(job => job.id !== action.payload.id).concat(action.payload), editingJob: initialState.editingJob, jobForm: false}
    case CREATE_JOB_FLAG: 
       return {...state, jobForm: false, createJobFlag: true}
    case CREATE_JOB: 
      return { ...state, jobs: [...state.jobs, action.payload], createJobFlag: false}
    default:
      return state;
  }

}

export default jobReducer;





