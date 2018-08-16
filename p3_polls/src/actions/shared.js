import { authUser } from "./authUser";
import { getInitialData } from "../utils/api";
import { receivePolls } from "./polls";
import { receiveUsers } from "./users";

const AUTHED_ID = "tylermcginnis";

export function handleInitialData () {
  return dispatch => {
    return getInitialData()
      .then({ polls, users } => {

        dispatch(receivePolls(polls));
        dispatch(receiveUsers(users));
        dispatch(setAuthedUser(AUTHED_ID));
    });
  };
}
