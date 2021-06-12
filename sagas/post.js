import { all, fork, delay, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// function signInAPI() {
// return axios...
// 실제 비동기 실행 코드
// }

function* AddPost() {
  try {
    // const result = yield call(signinAPI);
    yield delay(1000);
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', AddPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
