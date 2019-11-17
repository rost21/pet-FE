import { all } from 'redux-saga/effects';
import { saga as loginSaga } from './login/saga';
import { saga as registrationSaga } from './registration/saga';

export function* rootSaga() {
  yield all([loginSaga(), registrationSaga()]);
}
