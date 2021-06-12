import { all, fork, take, call, put } from 'redux-saga/effects';
import axios from 'axios';
function signinAPI() {
  // return axios...
  // 실제 비동기 실행 코드
}

function* Signin() {
  try {
    const result = yield call(signinAPI);
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

function* watchSignin() {
  yield take('SIGN_IN_REQUEST', Signin);
}

function* watchSignout() {
  yield take('SIGN_OUT_REQUEST');
}

function* watchAddPost() {
  yield take('ADD_POST_REQUEST');
}

export default function* rootSaga() {
  yield all([fork(watchSignin), fork(watchSignout), fork(watchAddPost)]);
}
