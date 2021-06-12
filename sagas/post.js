import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../actions';

import { all, fork, delay, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// function signInAPI() {
// return axios...
// 실제 비동기 실행 코드
// }

function* AddPost(action) {
  try {
    // const result = yield call(signinAPI);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

// function signInAPI() {
// return axios...
// 실제 비동기 실행 코드
// }

function* AddComment(action) {
  try {
    // const result = yield call(signinAPI);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, AddPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, AddComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
