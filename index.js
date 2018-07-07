// actions
// add todo
{
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Learn Redux",
    complete: false,
  },
}
// remove todo
{
  type: "REMOVE_TODO",
  id: 0,
}
// toggle todo
{
  type: "TOGGLE_TODO",
  id: 0,
}
// add goal
{
  type: "ADD_GOAL",
  goal: {
    id: 0,
    name: "Run a marathon",
  },
}
// remove goal
{
  type: "REMOVE_GOAL",
  id: 0,
}

// reducer
function todos (state = [], action) {
  switch(action.type) {
      case "ADD_TODO":
        return state.concat([action.todo]);
      case "REMOVE_TODO":
        return state.filter((todo) => todo.id !== action.id);
      case "TOGGLE_TODO":
        return state.map(
          (todo) => todo.id !== action.id
            ? todo : Object.assign({}, todo, {complete: !todo.complete})
        );
      default:
        return state;
  }

}

function createStore (reducer) {
  // four parts
  // 1. state
  // 2. method to get state (getState)
  // 3. method to listen to changes on state (subscribe)
  // 4. method to update state (dispatch)

  // 1. internal state (undefined to start, but will be an array eventually)
  // ... not sure why it's not an object....yet
  let state;
  // listeners
  let listeners = [];

  // 2. get state
  const getState = () => state;

  // 3. subscribe/listen to state changes
  const subscribe = (listener) => {
    // add listener
    listeners.push(listener);

    // return way to unsubscribe
    // below is a function that, when called, will reassign the private
    // variable *listeners* to it's filtered counterpart, where the filter
    // has removed all listeners except for the one assigned during this call
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    // call todos
    state = reducer(state, action);
    // loop over listeners and invoke
    listeners.forEach((listener) => listener())
  };

  return { getState, subscribe, dispatch }
}
