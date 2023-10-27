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
    case FETCH_PROJECT_FAILED:
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


export const fetchAllDpPictures = (
  state = {loading: false, dpPictures: []}, action
) => {
  switch (action.type) {
    case FETCH_ALL_DP_PICTURES:
      return {
        loading: true
      };
    case FETCH_ALL_DP_PICTURES_SUCCESSFUL:
      return {
        loading: false, dpPictures: action?.payload
      }
    case FETCH_ALL_DP_PICTURES_FAILED:
      return {
        loading: false
      }
    default: return state
  }
}







export const deleteDpArea = (
  state = {loading: false, status: null}, action
) => {
  switch (action.type) {
    case DELETE_DP_AREA:
      return {
        loading: true
      };
    case DELETE_DP_AREA_SUCCESSFUL:
      return {
        loading: false, status: 'successful'
      }
    case DELETE_DP_AREA_FAILED:
      return {
        loading: false
      }
      case RESET_FORM:
        return {
          status: false
        }
    default: return state
  }
}


export const createNewProject = (
  state = {loading: false, projectData: []}, action
) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        loading: true
      };
    case ADD_PROJECT_SUCCESSFUL:
      return {
        loading: false, projectData: action?.payload
      }
    case ADD_PROJECT_FAILED:
      return {
        loading: false
      }
      case RESET_FORM:
        return {
          projectData: []
        }
    default: return state
  }
}





export const createNewSubProject = (
  state = {loading: false, subProjectData: []}, action
) => {
  switch (action.type) {
    case ADD_SUB_PROJECT:
      return {
        loading: true
      };
    case ADD_SUB_PROJECT_SUCCESSFUL:
      return {
        loading: false, subProjectData: action?.payload
      }
    case ADD_SUB_PROJECT_FAILED:
      return {
        loading: false
      }
      case RESET_FORM:
        return {
          subProjectData: [],
        }
    default: return state
  }
}



export const createNewDpArea = (
  state = {loading: false, dpAreaData: []}, action
) => {
  switch (action.type) {
    case ADD_DP_AREA:
      return {
        loading: true
      };
    case ADD_DP_AREA_SUCCESSFUL:
      return {
        loading: false, dpAreaData: action?.payload
      }
    case ADD_DP_AREA_FAILED:
      return {
        loading: false
      }
    case RESET_FORM:
      return {
        dpAreaData: [],
      }
    default: return state
  }
}