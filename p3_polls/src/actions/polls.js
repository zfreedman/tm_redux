import { savePoll } from "../utils/api";
import { hideLoading, showLoading } from "react-redux-loading";

export const ADD_POLL = "ADD_POLL";
export const RECEIVE_POLLS = "RECEIVE_POLLS";

function addPoll (poll) {
  return {
    type: ADD_POLL,
    poll,
  };
}

export function handleAddPoll (poll) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return savePoll({
      ...poll,
      author: authedUser,
    })
    .then(poll => dispatch(addPoll(poll)))
    .then(() => dispatch(hideLoading()));
  };
}

export function receivePolls (polls) {
  return {
    type: RECEIVE_POLLS,
    polls,
  };
}
