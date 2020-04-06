import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from './actions';
import { login as loginApi, getUser as getUserApi } from '../../graphql/user';
import { ILoginUserResponse, IUser } from '../../types';
import { history } from '../../../main';
import ROUTES from '../../routes';
import { showNotification } from 'app/utils/notifications';

function* registration(action: ReturnType<typeof actions.registration.started>) {
  try {
    // const response: IRegisterUserResponse = yield call(api.registration, action.payload);

    // if (response.error) {
    //   if (!response.error.errors) {
    //     showNotification(response.error, 'error')
    //     return;
    //   }

    //   const errors = response.error.errors;
    //   Object.keys(errors).map((key) => showNotification(errors[key].message, 'error'));
    //   return;
    // }

    showNotification('Successful registration', 'success');
    yield history.push(ROUTES.LOGIN);
  } catch (e) {
    console.error(e)
  }
}

function* login(action: ReturnType<typeof actions.login.started>) {
  try {
    const payload = action.payload;
    const { data: { login: response } }: { data: { login: ILoginUserResponse } } = yield call(loginApi, payload);

    if (!response.isLoggedIn) {
      yield put(actions.login.failed({
        params: action.payload,
        error: 'Failed login'
      }));
      showNotification('Failed login', 'error');
      return;
    }
  
    if (response.isLoggedIn) {
      const { token } = response
      yield put(actions.login.done({ 
        params: action.payload,
        result: response,
      }));
      localStorage.setItem('token', token);
      history.push(ROUTES.MAIN);
    }
  } catch (e) {
    console.error(e);
    yield put(actions.login.failed({
      params: action.payload,
      error: e,
    }));
  }
}

function* logout() {
  localStorage.removeItem('token')
  yield history.push(ROUTES.LOGIN);
}

function* getUser(action: ReturnType<typeof actions.getUser.started>) {
  try {
    const { token } = action.payload;
    if (!token) {
      showNotification('You are not authorized', 'error');
      return history.replace(ROUTES.LOGIN);
    }
    const { data: { getUser: response} }: { data: { getUser: IUser } } = yield call(getUserApi, token);

    // if (response.error) {
    //   yield put(actions.login.failed(response.error));
    //   showNotification(response.error, 'error');
    //   return history.replace(ROUTES.LOGIN);
    // }
  
    yield put(actions.getUser.done({ 
      params: action.payload,
      result: response,
    }));
  } catch (e) {
    console.error(e)
    yield put(actions.getUser.failed({
      params: action.payload,
      error: e,
    }))
  }
}

export function* saga() {
  yield takeLatest(actions.registration.started, registration);
  yield takeLatest(actions.login.started, login);
  yield takeLatest(actions.logout, logout);
  yield takeLatest(actions.getUser.started, getUser);
}
