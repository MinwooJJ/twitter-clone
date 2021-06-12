import { all, fork, delay, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// function signInAPI() {
// return axios...
// 실제 비동기 실행 코드
// }

function* SignIn() {
  try {
    // const result = yield call(signinAPI);
    yield delay(1000);
    yield put({
      type: 'SIGN_IN_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'SIGN_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function* SignOut() {
  try {
    // const result = yield call(signinAPI);
    yield delay(1000);
    yield put({
      type: 'SIGN_IN_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'SIGN_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchSignIn() {
  yield takeLatest('SIGN_IN_REQUEST', SignIn);
}

function* watchSignOut() {
  yield takeLatest('SIGN_OUT_REQUEST', SignOut);
}

export default function* userSaga() {
  yield all([fork(watchSignIn), fork(watchSignOut)]);
}
