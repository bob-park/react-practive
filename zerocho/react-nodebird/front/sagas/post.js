import axios from 'axios';
import { all, call, put, delay, fork, takeLatest } from 'redux-saga/effects';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE
} from '../reducers/post';

function addPostAPI(postData) {
  return axios.post('/post', postData, {
    withCredentials: true,
  });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    yield put({
      type: ADD_POST_FAILURE,
      error: e,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function mainPostsAPI() {
  return axios.get('/posts');
}

function* mainPosts() {
  try {
    const result = yield call(mainPostsAPI);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e,
    });
  }
}

function* watchMainPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, mainPosts);
}

function addCommentAPI() {
  return axios.post('/comment');
}

function* addComment(action) {
  try {
    // yield call(addPostAPI);
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
      },
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e,
    });
  }
}

function* watchAddPComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchMainPosts), fork(watchAddPost), fork(watchAddPComment)]);
}
