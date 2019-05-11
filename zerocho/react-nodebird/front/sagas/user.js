import { all, fork, put, call, takeLatest, delay } from "redux-saga/effects";

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE
} from "../reducers/user";

function loginAPI() {
  // LOG_IN API 요청
  console.log("loginAPI");
}

function* login() {
  try {
    // loginAPI() 함수 호출
    yield call(loginAPI);

    // dispatch 와 같은 역할
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogin() {
  // [1] LOG_IN 액션을 기다림
  // [2] LOG_IN 액션이 들어오면 login() 실행
  yield takeLatest(LOG_IN_REQUEST, login);
}

export default function* userSaga() {
  yield all([fork(watchLogin)]);
}
