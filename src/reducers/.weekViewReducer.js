import { ADD_DAY, CLEAR_WEEK } from './types'

const initialState = {
  jobs: []
}


const weekViewReducer = (state = initialState, action) => {
  console.log("In weekViewReducer", action.payload)
  switch (action.type) {
    case CLEAR_WEEK:
      return initialState;
    case ADD_DAY:
      console.log("%cIN ADD DAY ", "color: green", action.payload);
      return { ...initialState, jobs: action.payload };
    default:
      return state;
  }

}

export default weekViewReducer;