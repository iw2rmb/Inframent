import Axios from "axios";
import { toast } from "react-toastify";
import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESSFUL,
  REQUEST_LOGIN_FAILED,
} from "../constant/userConstant";


const BASE_URL = process.env.REACT_APP_BASE_URL;
const customId = "custom-id-yes";


//This is the action that calls the authentication api
export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: REQUEST_LOGIN,
  });

  try {
    const { data } = await Axios.post(`${BASE_URL}/auth/login`, {
      email: email,
      password: password,
    });
    dispatch({
      type: REQUEST_LOGIN_SUCCESSFUL,
      payload: data,
    });

    // Saving the auth token to session storage
    sessionStorage.setItem("userInfo", JSON.stringify(data));
    console.log(data)
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
