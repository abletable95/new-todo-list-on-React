export const SEARCH_TODOS = "SEARCH_TODOS";
export const CLEAR_SEARCH = "CLEAR_SEARCH";

export const searchTodos = (payload) => {
  return {
    type: SEARCH_TODOS,
    payload
  };
};

export const clearSearch = (payload) => {
  return {
    type: CLEAR_SEARCH,
    payload,
  };
};

