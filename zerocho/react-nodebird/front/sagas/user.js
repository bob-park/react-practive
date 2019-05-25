import axios from 'axios';

import {
  all,
  fork,
  put,
  call,
  takeLatest,
  takeEvery,
  delay,
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
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../reducers/user';

function loginAPI(loginData) {
  // LOG_IN API 요청
  return axios.post('/user/login', loginData, {
    withCredentials: true,
  });
}

function* login(action) {
  try {
    // loginAPI() 함수 호출
    const result = yield call(loginAPI, action.data);

    // dispatch 와 같은 역할
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
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
  return axios.post(
    '/user/logout',
    {},
    {
      withCredentials: true,
    },
  );
}

function* logout() {
  try {
    yield call(logoutAPI);
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

function signUpAPI(signUpData) {
  return axios.post('/user', signUpData);
  //return axios.post("/api/user", signUpData);
}

function* signUp(action) {
  try {
    // call (함수, 함수의 파라미터)
    yield call(signUpAPI, action.data);
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

function loadUserAPI(signUpData) {
  return axios.get('/user/', {
    withCredentials: true,
  });
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchLoadUser),
  ]);
}
