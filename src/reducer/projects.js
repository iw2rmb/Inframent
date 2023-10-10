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
  FETCH_DP_PICTURE_FAILED
} from "../constant/products";

export const fetchProjectsReducer = (
  state = { loading: false, projects: [] },
  action
) => {
  switch (action.type) {
    case FETCH_PROJECT:
      return {
        loading: true,
      };
    case FETCH_PROJECT_SUCCESSFUL:
      return {
        loading: false,
        projects: action.payload,
      };
    case FETCH_SUB_PROJECT_FAILED:
      return {
        loading: false,
      };
    default:
      return state;
  }
};


export const fetchSubProjectsReducer = (
  state = { loading: false, subProjects: [] },
  action
) => {
  switch (action.type) {
    case FETCH_SUB_PROJECT:
      return {
        loading: true,
      };
    case FETCH_SUB_PROJECT_SUCCESSFUL:
      return {
        loading: false,
        subProjects: action.payload,
      };
    case FETCH_SUB_PROJECT_FAILED:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export const fetchPopArea = (
  state = {loading: false, dpAreas: []},
  action
) => {
  switch (action.type) {
    case FETCH_DP:
      return {
        loading: true
      };
    case FETCH_DP_SUCCESSFUL:
      return {
        loading: false, dpAreas: action.payload
      }
    case FETCH_DP_FAILED:
      return {
        loading: false, dpAreas: false
      }
    default:
      return state;
  }
}


export const fetchDpAreas = (
  state = {loading: false, areas: []},
  action
) => {
  switch (action.type) {
    case FETCH_DP_AREAS:
      return {
        loading: true
      };
    case FETCH_DP_AREAS_SUCCESSFUL:
      return {
        loading: false, areas: action.payload
      };
    case FETCH_DP_AREAS_FAILED:
      return {
        loading: false
      }
    default: return state
  }
}

export const fetchDpPictures = (
  state = {loading: false, picture: []}, action
) => {
  switch (action.type) {
    case FETCH_DP_PICTURE:
      return {
        loading: true
      }
    case FETCH_DP_PICTURE_SUCCESSFUL:
      return {
        loading: false, picture: action.payload
      }
    case FETCH_DP_PICTURE_FAILED:
      return {
        loading: false
      }
    default: return state
  }
}