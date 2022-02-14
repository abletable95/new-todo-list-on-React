import {
  ADD_TODO,
  FILTER_TODOS,
  MARK_TODO_DONE,
  DELETE_TODO,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAIL,
} from "../actions/todosActions";

const todos = [
  {
    id: 1,
    title: "Do it",
    completed: true,
    important: false,
  },
  {
    id: 2,
    title: "Do it now",
    completed: false,
    important: false,
  },
];

export const todoReducer = (state = todos, action) => {
  switch (action.type) {
    case GET_TODOS_SUCCESS:{
      const todos = action.payload.data
      return [...state, ...todos]
    }
    case ADD_TODO: {
      const item = action.payload;
      return [...state, item];
    }
    case DELETE_TODO: {
      const id = action.payload;
      return [
        ...state.filter((item) => {
          if (item.id !== id) return item;
        }),
      ];
    }
    case MARK_TODO_DONE: {
      const { id, completed } = action.payload;
      return [
        ...state.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              completed: !completed,
            };
          }
          return item;
        }),
      ];
    }
    case FILTER_TODOS: {
      const filter = action.payload;
      if (filter !== "done") {
        return [
          ...state.filter((item) => {
            if (item[filter]) {
              return item;
            }
          }),
          ...state.filter((item) => {
            if (!item[filter]) {
              return item;
            }
          }),
        ];
      } else {
        return [
          ...state.filter((item) => {
            if (!item.completed) {
              return item;
            }
          }),
          ...state.filter((item) => {
            if (item.completed) {
              return item;
            }
          }),
        ];
      }
    }
    default:
      return state;
  }
};
