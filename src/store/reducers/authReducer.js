import * as types from "../actions/actionConstants";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FACEBOOK_LOGIN_SUCCESS:
      return {
        token: action.payload.token ? action.payload.token : action.payload,
        userInfo: action.payload.resData ? action.payload.resData : {},
      };
    case types.FACEBOOK_LOGIN_FAIL:
      return {
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
