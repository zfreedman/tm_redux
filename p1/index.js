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
const RECEIVE_DATA = "RECIEVE_DATA";

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

function receiveDataAction(todos, goals) {
  return {
    type: RECEIVE_DATA,
    todos,
    goals,
  };
}

function handleDeleteTodo (todo) {
  return dispatch => {
    // give immediate feedback
    dispatch(removeTodoAction(todo.id));

    // attempt to delete on server
    return API.deleteTodo(todo.id)
    // add item back if failure
    .catch(() => {
      dispatch(addTodoAction(todo));
      alert("An error occurred. Try again.");
    });
  };
}

function handleDeleteGoal (goal) {
  return dispatch => {
    dispatch(removeGoalAction(goal.id));

    return API.deleteGoal(goal)
      .catch(() => {
        dispatch(addGoalAction(goal));
        alert("An error has occured. Please try again.");
      });
  };
}

function handleAddGoal (goalName, callback) {
  return dispatch => {
    return API.saveGoal(goalName)
      .then(goal => {
        dispatch(addGoalAction(goal));
        callback();
      })
      .catch(() => alert("The goal could not be saved. Please try again."));
  };
}

function handleAddTodo (todoName, callback) {
  return dispatch => {
    return API.saveTodo(todoName)
      .then(todo => {
        dispatch(addTodoAction(todo));
        callback();
      })
      .catch(() => alert("There was an error saving the todo. Please try again."));
  };
}

function handleToggleTodo (todoID) {
  return dispatch => {
    dispatch(toggleTodoAction(todoID));
    return API.saveTodoToggle(todoID)
      .catch(() => {
        dispatch(toggleTodoAction(todoID));
        alert("The todo was unable to be toggled");
      });
  };
}

function handleInitialData () {
  return dispatch => {
    return Promise.all([
      API.fetchTodos(),
      API.fetchGoals()
    ]).then(([todos, goals]) => dispatch(receiveDataAction(todos, goals)));
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

// const thunk = store => next => action => {
//   if (typeof action === "function") {
//     return action(store.dispatch);
//   }
//   return next(action);
// };

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
      case RECEIVE_DATA:
        return action.todos;
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
    case RECEIVE_DATA:
      return action.goals;
    default:
      return state;
  }
}

function loading (state = true, action) {
  switch(action.type) {
    case RECEIVE_DATA:
      return false;
    default:
      return state;
  }
}

// use this stuff below for testing
const store = Redux.createStore(Redux.combineReducers({
  goals,
  todos,
  loading,
// }), Redux.applyMiddleware(thunk, checker, logger));
}), Redux.applyMiddleware(ReduxThunk.default, checker, logger));
