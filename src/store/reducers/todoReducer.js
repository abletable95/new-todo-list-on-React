import { ADD_TODO } from "../actions/todosActions";
import { DELETE_TODO } from "../actions/todosActions";
import { MARK_TODO_DONE } from "../actions/todosActions";
import { FILTER_TODOS } from "../actions/todosActions";

const todos = [
  {
    id: 1,
    text: "Do it",
    isDone: true,
    important: false,
  },
  {
    id: 2,
    text: "Do it now",
    isDone: false,
    important: false,
  },
];

export const todoReducer = (state = todos, action) => {
  switch (action.type) {
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
      const { id, isDone } = action.payload;
      return [
        ...state.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isDone: !isDone,
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
            if (!item.isDone) {
              return item;
            }
          }),
          ...state.filter((item) => {
            if (item.isDone) {
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
