import Axios from "axios";
import { toast } from "react-toastify";

// Importing the constants for the authentication
import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESSFUL,
  REQUEST_LOGIN_FAILED,
} from "../constant/userConstant";

// This is the base url for the backend
const BASE_URL = "http://127.0.0.1:8000";
const customId = "custom-id-yes";

//This is the action that calls the authentication api
export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: REQUEST_LOGIN,
  });

  try {
    const { data } = await Axios.post(`${BASE_URL}/api/auth/login`, {
      email: email,
      password: password,
    });
    dispatch({
      type: REQUEST_LOGIN_SUCCESSFUL,
      payload: data,
    });

    // Saving the auth token to session storage
    sessionStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REQUEST_LOGIN_FAILED,
      payload:
        error.response && error.response.data[0]
          ? error.response.data.message
          : error.message,
    });

    toast.error(
      error.response && error.response.data[0]
        ? error.response.data[0]
        : error.message,
      {
        toastId: customId,
        position: "bottom-right",
        theme: "colored",
      }
    );
  }
};
