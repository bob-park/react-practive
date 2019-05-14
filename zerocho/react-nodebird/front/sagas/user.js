import axios from 'axios';

import {
  all, fork, put, call, takeLatest, takeEvery, delay,
} from 'redux-saga/effects';

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
} from '../reducers/user';

function loginAPI() {
  // LOG_IN API 요청
  // return axios.get('/login');
}

function* login() {
  try {
    // loginAPI() 함수 호출
    // yield call(loginAPI);
    yield delay(2000);

    // dispatch 와 같은 역할
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogin() {
  // [1] LOG_IN 액션을 기다림
  // [2] LOG_IN 액션이 들어오면 login() 실행
  yield takeLatest(LOG_IN_REQUEST, login);
}

function logoutAPI() {
  return axios.get('/logout');
}

function* logout() {
  try {
    // yield call(logoutAPI);
    yield delay(2000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
    });
  }
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUEST, logout);
}

function signUpAPI() {
  return axios.post('/signup');
}

function* signUp() {
  try {
    //yield call(signUpAPI);
    yield delay(2000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignUp)]);
}
