import { SHOW_JOB, UPDATE_JOB } from './types'

const initialState = {
  city: "",
  customer_id: null,
  description: "",
  end_time: "",
  id: null,
  location_id: null,
  paid: false,
  payment_type: "",
  price: "",
  schedule_date: "",
  schedule_time: "",
  start_time: "",
  state: "",
  status: "",
  street_1: "",
  street_2: "",
  team_id: null,
  zip: "",
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
    zip: ""
  },
  team: {
    id: null,
    name: ""
  },
  location: {
    id: null,
    nickname: "",
    city: ""
  },
  images: []
};

const jobsReducer = (state = initialState, action) => {
  console.log("In JOBReducer", action.payload)
  switch (action.type) {
    case SHOW_JOB:
      return {...initialState, ...action.payload}
    case UPDATE_JOB:
      return { ...initialState, ...action.payload }
    default:
      return state;
  }

}

export default jobsReducer;

