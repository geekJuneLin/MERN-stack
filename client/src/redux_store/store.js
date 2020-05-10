import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/rootReducer";
import authReducer from "../reducers/authReducer";
import errorReducer from "../reducers/errorReducer";

export default createStore(
  combineReducers({ rootReducer, authReducer, errorReducer }),
  composeWithDevTools()
);
