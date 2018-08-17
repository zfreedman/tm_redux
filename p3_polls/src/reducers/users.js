import {
  RECEIVE_USERS
} from "../actions/users";

import {
  ADD_POLL
} from "../actions/polls";

export default function users (state = {}, action) {
  switch (action.type) {

    case ADD_POLL:
      const { author, id } = action.poll;
      return {
        ...state,
        [author]: {
          ...state[author],
          polls: [...state[author].polls, id]
        }
      };

    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };

    default:
      return state;
  }
}
