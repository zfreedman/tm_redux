// library code
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

// app (combined) reducer
function app (state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

// use this stuff below for testing
// let store = createStore(app);
const store = createStore(app);

store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});

store.dispatch(addTodoAction({
  id: 0,
  name: "Walk the dog",
  complete: false,
}));

store.dispatch(addTodoAction({
  id: 1,
  name: 'Wash the car',
  complete: false,
}));

store.dispatch(addTodoAction({
  id: 2,
  name: 'Go to the gym',
  complete: true,
}));

store.dispatch(removeTodoAction(1));

store.dispatch(toggleTodoAction(0));

store.dispatch(addGoalAction({
  id: 0,
  name: 'Learn Redux'
}));

store.dispatch(addGoalAction({
  id: 1,
  name: 'Lose 20 pounds'
}));

store.dispatch(removeGoalAction(0));