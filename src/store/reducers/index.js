import userReducer from "./user.reducers";
import { combineReducers } from "redux";

export default combineReducers({
  user: userReducer,
});
