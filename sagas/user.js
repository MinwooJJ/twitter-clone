import { all, fork, delay, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// function signInAPI() {
// return axios...
// }

function* signIn(action) {
  try {
    // const result = yield call(signinAPI);
    yield delay(1000);
    yield put({
      type: 'SIGN_IN_SUCCESS',
      // Temporary signin dummy data
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: 'SIGN_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function* signOut() {
  try {
    // const result = yield call(signinAPI);
    yield delay(1000);
    yield put({
      type: 'SIGN_OUT_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'SIGN_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchSignIn() {
  yield takeLatest('SIGN_IN_REQUEST', signIn);
}

function* watchSignOut() {
  yield takeLatest('SIGN_OUT_REQUEST', signOut);
}

export default function* userSaga() {
  yield all([fork(watchSignIn), fork(watchSignOut)]);
}
