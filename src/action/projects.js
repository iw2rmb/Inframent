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
  DELETE_DP_AREA_FAILED,
  ADD_PROJECT,
  ADD_PROJECT_SUCCESSFUL,
  ADD_PROJECT_FAILED,
  ADD_DP_AREA,
  ADD_DP_AREA_SUCCESSFUL,
  ADD_DP_AREA_FAILED,
  ADD_SUB_PROJECT,
  ADD_SUB_PROJECT_SUCCESSFUL,
  ADD_SUB_PROJECT_FAILED,
  RESET_FORM
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
    const { data } = await Axios.get(`${BASE_URL}/projects/city-areas`, {
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
    const { data } = await Axios.get(`${BASE_URL}/projects/pop-areas/${projectId}`, {
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
      `${BASE_URL}/projects/dp-areas/${subProjectId}`,
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
    const { data } = await Axios.get(`${BASE_URL}/projects/dp-pictures-list/${dp_id}`, {
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
    const { data } = await Axios.get(`${BASE_URL}/projects/dp-picture-get/${id}`, {
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







export const createNewProject = ({userId, value}) => async (dispatch) => {
  dispatch({
    type: ADD_PROJECT,
  });

  const data = sessionStorage.getItem("userInfo");
  const authToken = JSON.parse(data)?.auth_token;
  try {
    const { data } = await Axios.post(`${BASE_URL}/projects/city-areas/add`, {
      "name": value,
      "created_by": userId
    }, {
      headers: {
        Accept: "application/json",
        Authorization: `Token ${authToken}`,
      },
    });

    dispatch({
      type: ADD_PROJECT_SUCCESSFUL,
      payload: data,
    });
    toast.success('Project created successfully', {
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
      type: ADD_PROJECT_FAILED,
      payload:
        error.response && error.response.data[0]
          ? error.response.data.message
          : error.message,
    });
  }
};















export const createNewSubProject = ({value, projectId, userId}) => async (dispatch) => {
  dispatch({
    type: ADD_SUB_PROJECT,
  });

  const data = sessionStorage.getItem("userInfo");
  const authToken = JSON.parse(data)?.auth_token;

  try {
    const { data } = await Axios.post(`${BASE_URL}/projects/pop-areas/${projectId}/add`, {
      "name": value,
    }, {
      headers: {
        Accept: "application/json",
        Authorization: `Token ${authToken}`,
      },
    });

    dispatch({
      type: ADD_SUB_PROJECT_SUCCESSFUL,
      payload: data,
    });
    toast.success('Sub-project created successfully', {
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
      type: ADD_SUB_PROJECT_FAILED,
      payload:
        error.response && error.response.data[0]
          ? error.response.data.message
          : error.message,
    });
  }
};




export const createNewDpArea = ({subProjectId, value, userId}) => async (dispatch) => {
  dispatch({
    type: ADD_DP_AREA,
  });

  const data = sessionStorage.getItem("userInfo");
  const authToken = JSON.parse(data)?.auth_token;

  try {
    const { data } = await Axios.post(`${BASE_URL}/projects/dp-areas/${subProjectId}/add`,  {
      "name": value,
      "created_by": userId
    },{
      headers: {
        Accept: "application/json",
        Authorization: `Token ${authToken}`,
      },
    });

    dispatch({
      type: ADD_DP_AREA_SUCCESSFUL,
      payload: data,
    });

    toast.success('DP area created successfully', {
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
      type: ADD_DP_AREA_FAILED,
      payload:
        error.response && error.response.data[0]
          ? error.response.data.message
          : error.message,
    });
  }
};


export const resetForm = () => async (dispatch) => {
  dispatch({
    type: RESET_FORM
  })
}