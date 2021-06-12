import { all, fork } from 'redux-saga/effects';
import postSaga from './postSaga';
import userSaga from './userSaga';

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
