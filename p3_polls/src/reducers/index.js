import authedUser from "./authedUser";
import polls from "./polls";
import users from "./users";
import { combineReducers } from "redux";

export default combineReducers({
  authedUser,
  polls,
  users,
});
