import { CHANGE_STATUS, ADD_NOTE} from './types'

const initialState = {
  customer_id: "",
   location_id: "",
   team_id: "",
   address: {
     street_1: "",
     street_2: "",
     city: "",
     zip: "",
     state: ""
   },
    price: "",
    schedule_date: "",
    schedule_time: "",
    start_time: "",
    end_time: "",
    status: "",
    payment_type: "",
    paid: false,
    note: "",
    description: ""
}


 const jobReducer = (state = initialState, action) => {
   switch(action.type){
     case CHANGE_STATUS:
      return {...state, status: action.payload}
     case ADD_NOTE:
      return {...state, note: action.payload}
    default: 
      return state;
   }

}

export default jobReducer;