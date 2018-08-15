import API from "goals-todos-api";

// action types
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

// action creators
function addTodo (todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}
function removeTodo (id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}
function toggleTodo (id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}

// async action creators
export function handleDeleteTodo (todo) {
  return dispatch => {
    // give immediate feedback
    dispatch(removeTodo(todo.id));

    // attempt to delete on server
    return API.deleteTodo(todo.id)
    // add item back if failure
    .catch(() => {
      dispatch(addTodo(todo));
      alert("An error occurred. Try again.");
    });
  };
}

export function handleAddTodo (todoName, callback) {
  return dispatch => {
    return API.saveTodo(todoName)
      .then(todo => {
        dispatch(addTodo(todo));
        callback();
      })
      .catch(() => alert("There was an error saving the todo. Please try again."));
  };
}

export function handleToggleTodo (todoID) {
  return dispatch => {
    dispatch(toggleTodo(todoID));
    return API.saveTodoToggle(todoID)
      .catch(() => {
        dispatch(toggleTodo(todoID));
        alert("The todo was unable to be toggled");
      });
  };
}
