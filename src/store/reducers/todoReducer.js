import { ADD_TODO } from "../actions/actions";
import { DELETE_TODO } from "../actions/actions";
import { MARK_TODO_DONE } from "../actions/actions";

const todos = [
  {
    id: 1,
    text: "Do it",
    isDone: true,
  },
  {
    id: 2,
    text: "Do it now",
    isDone: false,
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
      const {id, isDone }= action.payload;
      console.log(id, isDone)
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
    default:
      return state;
  }
};
