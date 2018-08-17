import { savePollAnswer } from "../utils/api";
import { hideLoading, showLoading } from "react-redux-loading";

export const ADD_ANSWER = "ADD_ANSWER";

function addAnswer ({ answer, authedUser, id, }) {
  return {
    type: ADD_ANSWER,
    answer,
    authedUser,
    id,
  };
}

export function handleAddAnswer (answerData) {
  return (dispatch) => {

    dispatch(showLoading());

    return savePollAnswer(answerData)
      .then(() => dispatch(addAnswer(answerData)))
      .then(() => dispatch(hideLoading()));
  };
}
