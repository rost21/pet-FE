import { takeLatest, call, takeEvery, put } from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';
import { IRegisterUserResponse } from 'app/redux/types';
import { history } from '../../../main';
import ROUTES from '../../routes';
import { showNotification } from 'app/utils/notifications';

function* registration(action: ReturnType<typeof actions.registration.started>) {
  const response: IRegisterUserResponse = yield call(api.registration, action.payload);

  if (response.error) {
    if (!response.error.errors) {
      showNotification(response.error, 'error')
      return;
    }

    const errors = response.error.errors;
    Object.keys(errors).map((key) => showNotification(errors[key].message, 'error'));
    return;
  }

  showNotification('Successful registration', 'success');
  history.push(ROUTES.LOGIN);
}

function* login(action: ReturnType<typeof actions.login.started>) {
  const response = yield call(api.login, action.payload);

  if (response.error) {
    yield put(actions.login.failed(response.error));
    showNotification(response.error, 'error');
    return;
  }

  if (response.isLoggedIn) {
    const { id, username, email, token } = response
    yield put(actions.setUser({ 
      id,
      username,
      email,
    }));
    localStorage.setItem('token', token);
    history.push(ROUTES.MAIN);
  }
}

function* logout() {
  yield history.push(ROUTES.LOGIN);
}

function* getUser(action: ReturnType<typeof actions.getUser.started>) {
  const response = yield call(api.getUser, action.payload);
  if (response.error) {
    yield put(actions.login.failed(response.error));
    showNotification(response.error, 'error');
    return history.replace(ROUTES.LOGIN);
  }
  
  const { id, username, email } = response.user
  yield put(actions.setUser({ 
    id,
    username,
    email,
  }));
}

export function* saga() {
  yield takeLatest(actions.registration.started, registration);
  yield takeEvery(actions.login.started, login);
  yield takeEvery(actions.logout, logout);
  yield takeLatest(actions.getUser.started, getUser);
}
