import {
  ADD_ANSWER
} from "../actions/answers";

import {
  ADD_POLL, RECEIVE_POLLS
} from "../actions/polls";

export default function polls (state = {}, action) {
  switch (action.type) {

    case ADD_ANSWER:
      const { answer, authedUser, id } = action;
      const poll = state[id];
      const voteKey = answer + "Votes";

      return {
        ...state,
        [id]: {
          ...poll,
          [voteKey]: [...poll[voteKey], authedUser]
        }
      };

    case ADD_POLL:
      return {
        ...state,
        [action.poll.id]: action.poll,
      };
    case RECEIVE_POLLS:
      return {
        ...state,
        ...action.polls,
      };

    default:
      return state;
  }
}
