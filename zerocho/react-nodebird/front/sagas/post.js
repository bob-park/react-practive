import axios from 'axios';
import {
  all, call, put, delay, fork, takeLatest,
} from 'redux-saga/effects';
import {
  ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from '../reducers/post';

function addPostAPI() {
  return axios.post('/post');
}

function* addPost() {
  try {
    // yield call(addPostAPI);
    yield delay(2000);
    yield put({
      type: ADD_POST_SUCCESS,
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
  yield all([fork(watchAddPost), fork(watchAddPComment)]);
}
