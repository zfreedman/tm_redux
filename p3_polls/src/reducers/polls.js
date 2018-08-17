import {
  ADD_POLL, RECEIVE_POLLS
} from "../actions/polls";

export default function polls (state = {}, action) {
  switch (action.type) {

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
