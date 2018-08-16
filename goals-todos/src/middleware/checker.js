import { ADD_GOAL } from "../actions/goals";
import { ADD_TODO } from "../actions/todos";

export const checker = store => next => action => {
  if (
    action.type === ADD_TODO &&
    action.todo.name.toLowerCase().indexOf("bitcoin") !== -1
  ) {
    return alert("Nope. That's a bad idea.");
  }
  else if (
    action.type === ADD_GOAL &&
    action.goal.name.toLowerCase().indexOf("bitcoin") !== -1
  ) {
    return alert("Nope. That's a bad idea.");
  }
  // all other cases, handle action accordingly
  return next(action);
};

export default checker;
