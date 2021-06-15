import { all, fork, delay, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../actions';

// function signInAPI() {
// return axios...
// }

function* signIn(action) {
  try {
    // const result = yield call(signinAPI);
    yield delay(1000);
    yield put({
      type: SIGN_IN_SUCCESS,
      // Temporary signin dummy data
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_IN_FAILURE,
      error: err.response.data,
    });
  }
}

// function signOutAPI() {
// return axios...
// }

function* signOut() {
  try {
    yield delay(1000);
    yield put({
      type: SIGN_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

// function signUpAPI() {
// return axios...
// }

function* signUp() {
  try {
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signIn);
}

function* watchSignOut() {
  yield takeLatest(SIGN_OUT_REQUEST, signOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchSignIn), fork(watchSignOut), fork(watchSignUp)]);
}
