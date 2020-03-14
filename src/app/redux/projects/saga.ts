import { takeLatest, call, takeEvery, put } from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';
import { showNotification } from 'app/utils/notifications';

function* getAllProjects() {
  // const response = yield call(api.getAllProjects);
}

export function* saga() {
  yield takeLatest(actions.getAllProjects.started, getAllProjects);
}
