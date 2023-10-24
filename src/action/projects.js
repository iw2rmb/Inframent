import Axios from "axios";
import {
  FETCH_PROJECT,
  FETCH_PROJECT_SUCCESSFUL,
  FETCH_PROJECT_FAILED,
  FETCH_DP,
  FETCH_DP_SUCCESSFUL,
  FETCH_DP_FAILED,
  FETCH_SUB_PROJECT,
  FETCH_SUB_PROJECT_SUCCESSFUL,
  FETCH_SUB_PROJECT_FAILED,
  FETCH_DP_AREAS,
  FETCH_DP_AREAS_SUCCESSFUL,
  FETCH_DP_AREAS_FAILED,
  FETCH_DP_PICTURE,
  FETCH_DP_PICTURE_SUCCESSFUL,
  FETCH_DP_PICTURE_FAILED,
  FETCH_ALL_DP_PICTURES,
  FETCH_ALL_DP_PICTURES_SUCCESSFUL,
  FETCH_ALL_DP_PICTURES_FAILED,
  DELETE_DP_AREA,
  DELETE_DP_AREA_SUCCESSFUL,
  DELETE_DP_AREA_FAILED
} from "../constant/products";
import { toast } from "react-toastify";


const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchProjects = () => async (dispatch) => {
  dispatch({
    type: FETCH_PROJECT,
  });

  const data = sessionStorage.getItem("userInfo");
  const authToken = JSON.parse(data)?.auth_token;
  try {
    const { data } = await Axios.get(`${BASE_URL}/projects`, {
      headers: {
        Accept: "application/json",
        Authorization: `Token ${authToken}`,
      },
    });

    dispatch({
      type: FETCH_PROJECT_SUCCESSFUL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROJECT_FAILED,
      payload:
        error.response && error.response.data[0]
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchSubProjects = (projectId) => async (dispatch) => {
  dispatch({
    type: FETCH_SUB_PROJECT,
  });
  const data = sessionStorage.getItem("userInfo");
  const authToken = JSON.parse(data)?.auth_token;

  try {
    const { data } = await Axios.get(`${BASE_URL}/projects/${projectId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Token ${authToken}`,
      },
    });

    dispatch({
      type: FETCH_SUB_PROJECT_SUCCESSFUL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SUB_PROJECT_FAILED,
      payload:
        error.response && error.response.data[0]
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchDP = (subProjectId) => async (dispatch) => {
  dispatch({
    type: FETCH_DP,
  });
  const data = sessionStorage.getItem("userInfo");
  const authToken = JSON.parse(data)?.auth_token;

  try {
    const { data } = await Axios.get(
      `${BASE_URL}/projects/pop-areas/${subProjectId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Token ${authToken}`,
        },
      }
    );

    dispatch({
      type: FETCH_DP_SUCCESSFUL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DP_FAILED,
      payload:
        error.response && error.response.data[0]
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchDpAreas = (dp_id) => async (dispatch) => {
  dispatch({
    type: FETCH_DP_AREAS,
  });

  const data = sessionStorage.getItem("userInfo");
  const authToken = JSON.parse(data)?.auth_token;

  try {
    const { data } = await Axios.get(`${BASE_URL}/projects/dp-areas/${dp_id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Token ${authToken}`,
      },
    });

    dispatch({
      type: FETCH_DP_AREAS_SUCCESSFUL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DP_AREAS_FAILED,
      payload:
        error.response && error.response.data[0]
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchDpPictures = (id) => async (dispatch) => {
  dispatch({
    type: FETCH_DP_PICTURE,
  });

  const data = sessionStorage.getItem("userInfo");
  const authToken = JSON.parse(data)?.auth_token;

  try {
    const { data } = await Axios.get(`${BASE_URL}/projects/dp-pictures/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Token ${authToken}`,
      },
    });

    dispatch({
      type: FETCH_DP_PICTURE_SUCCESSFUL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DP_PICTURE_FAILED,
      payload:
        error.response && error.response.data[0]
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchAllDPPictures = () => async (dispatch) => {
  dispatch({
    type: FETCH_ALL_DP_PICTURES,
  });

  const data = sessionStorage.getItem("userInfo");
  const authToken = JSON.parse(data)?.auth_token;

  try {
    const { data } = await Axios.get(`${BASE_URL}/projects/all-dp-pictures`, {
      headers: {
        Accept: "application/json",
        Authorization: `Token ${authToken}`,
      },
    });

    dispatch({
      type: FETCH_ALL_DP_PICTURES_SUCCESSFUL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_DP_PICTURES_FAILED,
      payload:
        error.response && error.response.data[0]
          ? error.response.data.message
          : error.message,
    });
  }
};





export const deleteDpArea = (id, categoryName, dpNote, depth) => async (dispatch) => {
  dispatch({
    type: DELETE_DP_AREA,
  });



  const data = sessionStorage.getItem("userInfo");
  const authToken = JSON.parse(data)?.auth_token;
  console.log(id)
  try {
    const { data } = await Axios.patch(`${BASE_URL}/projects/dp-pictures/${id}/update`, {
      "dp_category_name": categoryName,
      "dp_note": dpNote,
      "depth": depth,
      "active": false
    }, {
      headers: {
        Accept: "application/json",
        Authorization: `Token ${authToken}`,
      },
    });

    dispatch({
      type: DELETE_DP_AREA_SUCCESSFUL,
      payload: data,
    });

    toast.success('Picture successfully deleted', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  } catch (error) {
    dispatch({
      type: DELETE_DP_AREA_FAILED,
      payload:
        error.response && error.response.data[0]
          ? error.response.data.message
          : error.message,
    });
  }
};
