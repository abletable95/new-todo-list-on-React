import {
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAIL,
} from "../actions/todosActions";
import { put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";

function* fetchTodos(action) {
  try {
    const todos = yield axios.get(
      `https://jsonplaceholder.typicode.com/users/1/todos`
    );
    yield put({
      type: GET_TODOS_SUCCESS,
      payload: todos,
    });
  } catch (e) {
    yield put({
      type: GET_TODOS_FAIL,
      payload: {
        message: e.message,
      },
    });
  }
}

export function* todosFetchRequestWacherSaga() {
  yield takeEvery(GET_TODOS_REQUEST, fetchTodos);
}

export function* rootSaga() {
  yield all([todosFetchRequestWacherSaga()]);
}
