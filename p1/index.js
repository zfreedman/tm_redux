function generateId () {
  return Math.random().toString(36).substring(2)
    + (new Date()).getTime().toString(36);
}

// app code
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

// action creators
// todos
function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}
function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}
function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}
// goals
function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  };
}
function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}

function checkAndDispatch (store, action) {
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
  return store.dispatch(action);
}

// bitcoin checker middleware
const checker = store => next => action => {
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

// logger applyMiddleware
const logger = store => next => action => {
  console.group(action.type);
  console.log("action:", action);
  const result = next(action);
  console.log("new state: ", store.getState());
  console.groupEnd();
  return result;
};

// todos reducer
function todos (state = [], action) {
  switch(action.type) {
      case ADD_TODO:
        return state.concat([action.todo]);
      case REMOVE_TODO:
        return state.filter((todo) => todo.id !== action.id);
      case TOGGLE_TODO:
        return state.map(
          (todo) => todo.id !== action.id
            ? todo : Object.assign({}, todo, {complete: !todo.complete})
        );
      default:
        return state;
  }
}

// goals reducer
function goals (state = [], action) {
  switch(action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

// use this stuff below for testing
const store = Redux.createStore(Redux.combineReducers({
  todos,
  goals,
}), Redux.applyMiddleware(checker, logger));
