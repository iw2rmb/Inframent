import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { signinReducer, getUserDetails } from "./reducer/userReducer";
import { fetchProjectsReducer, fetchSubProjectsReducer, fetchPopArea, fetchDpAreas, fetchDpPictures, fetchAllDpPictures, deleteDpArea, createNewProject, createNewSubProject, createNewDpArea, deleteDpAreas, deleteProject, deleteSubProject } from "./reducer/projects";
const rootReducer = combineReducers({
  userSignin: signinReducer,
  listProjects: fetchProjectsReducer,
  listSubProjects: fetchSubProjectsReducer,
  listPopAreas: fetchPopArea,
  listDpAreas: fetchDpAreas,
  dpPicture: fetchDpPictures,
  dpPictures: fetchAllDpPictures,
  deleteDpArea: deleteDpArea,
  addProject: createNewProject,
  addNewSubProject: createNewSubProject,
  addNewDpArea: createNewDpArea,
  userDetail: getUserDetails,
  deleteDpAreas: deleteDpAreas,
  deleteProject: deleteProject,
  deleteSubProject: deleteSubProject

});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
