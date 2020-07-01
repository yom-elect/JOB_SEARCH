import * as types from "../actions/actionConstants";

const INITIAL_STATE = {
  jobs: [],
};

const jobReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };
    default:
      return state;
  }
};

export default jobReducer;
