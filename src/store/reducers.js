import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import jobReducer from "./reducers/jobReducer";
import likeReducer from "./reducers/likeReducer";

export default combineReducers({
  auth: authReducer,
  jobs: jobReducer,
  likedJobs: likeReducer,
});
