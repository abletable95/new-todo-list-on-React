import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./reducers/reducers";
import createSagaMiddleware from "@redux-saga/core";
import {rootSaga} from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
sagaMiddleware.run(rootSaga)
  return store;
};
