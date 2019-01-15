import { ADD_JOB } from './types'

const initialState = {
  city: "",
  customer: { 
    city: "",
    email: "",
    id: null,
    name: "",
    phone: "",
    poc: "",
    state: "",
    street_1: "",
    street_2: "",
    zip: ""},
  customer_id: null,
  description: null,
  end_time: null,
  id: null,
  images: [],
  location: { 
    id: 1, 
    nickname: "", 
    city: "" 
  },
  location_id: 1,
  paid: false,
  payment_type: null,
  price: null,
  schedule_date: "",
  schedule_time: "",
  start_time: null,
  state: "",
  status: null,
  street_1: "",
  street_2: "",
  team: { 
    id: null, 
    name: "" 
  },
  team_id: null,
  zip: ""
}

const jobsReducer = (state = initialState, action) => {
  console.log("In JOBReducer", action.payload)
  switch (action.type) {
    //expecting job object this is the job object that manager and owner will have access when updating a job or creating a new job. 
    case ADD_JOB:
      return action.payload;
    default:
      return state;
  }

}

export default jobsReducer;

