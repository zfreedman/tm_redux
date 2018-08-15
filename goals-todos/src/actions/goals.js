import API from "goals-todos-api";

// action types
export const ADD_GOAL = "add_goal";
export const REMOVE_GOAL = "remove_goal";

// action creators
function addGoal (goal) {
  return {
    type: ADD_GOAL,
    goal,
  };
}
function removeGoal (id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}

// asynchronous action creators
export function handleDeleteGoal (goal) {
  return dispatch => {
    dispatch(removeGoal(goal.id));

    return API.deleteGoal(goal)
      .catch(() => {
        dispatch(addGoal(goal));
        alert("An error has occured. Please try again.");
      });
  };
}

export function handleAddGoal (goalName, callback) {
  return dispatch => {
    return API.saveGoal(goalName)
      .then(goal => {
        dispatch(addGoal(goal));
        callback();
      })
      .catch(() => alert("The goal could not be saved. Please try again."));
  };
}
