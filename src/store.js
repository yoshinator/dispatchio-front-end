import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";

import loginReducer from './reducers/loginReducer';
import companyReducer from './reducers/companyReducer';
import jobReducer from  './reducers/jobReducer'
import jobsReducer from  './reducers/jobsReducer'

const rootReducer = combineReducers({ companyReducer, jobsReducer, loginReducer, jobReducer})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;