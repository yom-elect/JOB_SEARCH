import * as types from "../actions/actionConstants";
import _ from "lodash";
const likeReducer = (state = [], action) => {
  switch (action.type) {
    case types.LIKE_JOB:
      return _.uniqBy([action.payload, ...state], "jobkey");
    case types.CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
};

export default likeReducer;
