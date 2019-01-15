import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";

import loginReducer from './reducers/loginReducer';
import companyReducer from './reducers/companyReducer';
import weekViewReducer from "./reducers/weekViewReducer";
import jobsReducer from  './reducers/jobsReducer'
import jobReducer from  './reducers/jobReducer'

const rootReducer = combineReducers({
  companyReducer,
  jobsReducer,
  loginReducer,
  weekViewReducer,
  jobReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;