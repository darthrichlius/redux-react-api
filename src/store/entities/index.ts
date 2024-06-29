// store/entities/index.js
import { combineReducers } from "redux";
import usersReducer from "./users";
import bugsReducer from "./bugs";
import projectsReducer from "./projects";

export default combineReducers({
  users: usersReducer,
  bugs: bugsReducer,
  projects: projectsReducer,
});
