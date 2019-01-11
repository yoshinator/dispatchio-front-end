import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";

import reducer from './reducers/reducer';
import loginReducer from './reducers/loginReducer';

const rootReducer = combineReducers({reducer, loginReducer})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;