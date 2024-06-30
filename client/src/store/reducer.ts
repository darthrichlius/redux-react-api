import { combineReducers } from "redux";
import entitiesReducer from "@store/entities";

export default combineReducers({
  entities: entitiesReducer,
});
