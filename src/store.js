import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";

import reducer from './reducers/reducer';
import user from './reducers/user';


const rootReducer = combineReducers({reducer, user})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;