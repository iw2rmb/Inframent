import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESSFUL,
  REQUEST_LOGIN_FAILED,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESSFUL,
  GET_USER_PROFILE_FAILED,
} from "../constant/userConstant";

//This is the reducer for the authentication action
export const signinReducer = (
  state = { loading: false, error: null },
  action
) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        loading: true,
        error: null,
      };
    case REQUEST_LOGIN_SUCCESSFUL:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case REQUEST_LOGIN_FAILED:
      return {
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export const getUserDetails = (
  state = {loading: false, details: [], error: null},
  action
) => {
  switch (action?.type) {
    case GET_USER_PROFILE:
      return {
        loading: true
      }
    case GET_USER_PROFILE_SUCCESSFUL: 
    return {
      loading: false,
      details: action?.payload
    }
    case GET_USER_PROFILE_FAILED:
      return {
        loading: false,
        error: true
      }
    default:
      return state
  }
}