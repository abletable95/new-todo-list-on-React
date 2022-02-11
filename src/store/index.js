import { createStore } from "redux";
import { rootReducer } from "./reducers/reducers";

export const configureStore = () => {
  const store = createStore(rootReducer);
  return store;
};
