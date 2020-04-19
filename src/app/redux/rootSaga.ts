import { all } from 'redux-saga/effects';
import { saga as authSaga } from './auth/saga';
import { saga as projectSaga } from './projects/saga';

export function* rootSaga() {
  yield all([
    authSaga(),
    projectSaga()
  ]);
}
