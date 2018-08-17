import authedUser from "./authedUser";
import polls from "./polls";
import users from "./users";
import { loadingBarReducer } from "react-redux-loading";
import { combineReducers } from "redux";

export default combineReducers({
  authedUser,
  loadingBar: loadingBarReducer,
  polls,
  users,
});
