import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { signinReducer } from "./reducer/userReducer";

const rootReducer = combineReducers({
  userSignin: signinReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
