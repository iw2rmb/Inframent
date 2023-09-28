import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESSFUL,
  REQUEST_LOGIN_FAILED,
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
