import { all } from 'redux-saga/effects';
import { saga as authSaga } from './auth/saga';
import { saga as projectsSaga } from './project/saga';
import { saga as tasksSaga } from './task/saga';

export function* rootSaga() {
  yield all([
    authSaga(),
    projectsSaga(),
    tasksSaga(),
  ]);
}
