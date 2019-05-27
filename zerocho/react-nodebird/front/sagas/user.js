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
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  EDIT_NICKNAME_FAILURE,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_REQUEST,
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

function loadUserAPI(userId) {
  return axios.get(userId ? `/user/${userId}` : '/user', {
    withCredentials: true,
  });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data,
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

function followAPI(userId) {
  return axios.post(
    `/user/${userId}/follow`,
    {},
    {
      withCredentials: true,
    },
  );
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: e,
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_USER_REQUEST, follow);
}

function unFollowAPI(userId) {
  return axios.delete(`/user/${userId}/follow`, {
    withCredentials: true,
  });
}

function* unFollow(action) {
  try {
    const result = yield call(unFollowAPI, action.data);
    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: e,
    });
  }
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_USER_REQUEST, unFollow);
}

function loadFollowersAPI(userId, offset = 0, limit = 3) {
  return axios.get(
    `/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`,
    {
      withCredentials: true,
    },
  );
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data, action.offset);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function loadFollowingsAPI(userId, offset = 0, limit = 3) {
  return axios.get(
    `/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`,
    {
      withCredentials: true,
    },
  );
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data, action.offset);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function removeFollowerAPI(userId) {
  return axios.delete(`/user/${userId}/follower`, {
    withCredentials: true,
  });
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: e,
    });
  }
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function editNicknameAPI(nickname) {
  return axios.patch(
    `/user/nickname`,
    { nickname },
    {
      withCredentials: true,
    },
  );
}

function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data);
    yield put({
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: e,
    });
  }
}

function* watchEditNickname() {
  yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchLoadUser),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchEditNickname),
  ]);
}
