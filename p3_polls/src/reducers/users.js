import { ADD_ANSWER } from "../actions/answers";
import { ADD_POLL } from "../actions/polls";
import { RECEIVE_USERS } from "../actions/users";

export default function users (state = {}, action) {
  switch (action.type) {

    case ADD_ANSWER:
      const user = state[action.authedUser];
      return {
        ...state,
        [action.authedUser]: {
          ...user,
          answers: [...user.answers, action.id]
        }
      };

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
