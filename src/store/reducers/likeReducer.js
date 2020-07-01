import * as types from "../actions/actionConstants";
import _ from "lodash";

const likeReducer = (state = [], action) => {
  switch (action.type) {
    case types.LIKE_JOB:
      return _.uniqBy([action.payload, ...state], "jobkey");
    default:
      return state;
  }
};

export default likeReducer;
