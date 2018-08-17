import { getInitialData } from "../utils/api";
import { receivePolls } from "./polls";
import { receiveUsers } from "./users";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = "tylermcginnis";

export function handleInitialData () {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ polls, users }) => {
        dispatch(receivePolls(polls));
        dispatch(receiveUsers(users));
        dispatch(setAuthedUser(AUTHED_ID));
        dispatch(hideLoading());
    });
  };
}
