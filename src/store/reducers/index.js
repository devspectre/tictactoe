import { combineReducers } from "redux";
import players from "./players";
import credits from "./credits";

export default combineReducers({
  players,
  credits,
});