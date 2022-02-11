export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const MARK_TODO_DONE = "MARK_TODO_DONE";

export const FILTER_TODOS = "FILTER_TODOS";

export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload,
  };
};

export const deleteTodo = (payload) => {
  return {
    type: DELETE_TODO,
    payload,
  };
};

export const markTodoDone = (payload) => {
  return {
    type: MARK_TODO_DONE,
    payload,
  };
};

export const filterTodos = (payload) => {
  return {
    type: FILTER_TODOS,
    payload,
  };
};
