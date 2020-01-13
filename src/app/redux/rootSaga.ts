import { all } from 'redux-saga/effects';
import { saga as authSaga } from './auth/saga';

export function* rootSaga() {
  yield all([
    authSaga()
  ]);
}
