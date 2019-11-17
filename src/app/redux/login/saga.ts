import { takeEvery } from 'redux-saga/effects';

export function* authorization() {
  yield console.log('action');
}

export function* saga() {
  yield takeEvery('LOGIN', authorization);
}
