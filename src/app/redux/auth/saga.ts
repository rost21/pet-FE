import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as actions from './actions';
import { register as registerApi, login as loginApi, getUser as getUserApi, getUsers, updateUser } from '../../graphql/user';
import { ILoginUserResponse, IUser, IRegisterUserResponse, UpdateUserResponse } from '../../types';
import { history } from '../../../main';
import ROUTES from '../../routes';
import { showNotification } from 'app/utils/notifications';
import { IRootReducer } from '../rootReducer';

function* registration(action: ReturnType<typeof actions.registration.started>) {
  try {
    const payload = action.payload;
    const { data: { register: response } }: { data: { register: IRegisterUserResponse } } = yield call(registerApi, payload);

    if (response && !response.isCreated) {
      showNotification(response.message!, 'error');
      return;
    }

    showNotification('Successful registration', 'success');
    history.push(ROUTES.LOGIN);
  } catch (e) {
    console.error(e);
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
      const { token } = response;
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
  localStorage.removeItem('token');
  yield history.push(ROUTES.LOGIN);
}

function* getUser(action: ReturnType<typeof actions.getUser.started>) {
  try {
    const { token } = action.payload;
    if (!token) {
      showNotification('You are not authorized', 'error');
      return history.replace(ROUTES.LOGIN);
    }
    const { data: { getUser: response } }: { data: { getUser: IUser } } = yield call(getUserApi, token);
  
    yield put(actions.getUser.done({ 
      params: action.payload,
      result: response,
    }));
  } catch (e) {
    console.error(e);
    yield put(actions.getUser.failed({
      params: action.payload,
      error: e,
    }));
  }
}

function* getAllUsers() {
  try {
    const { data: { users: response } } = yield call(getUsers);

    if (!response) {
      return;
    }

    yield put(actions.getAllUsers.done({
      params: {},
      result: response,
    }));
  } catch (e) {
    console.log(e);
    yield put(actions.getAllUsers.failed({
      params: {},
      error: e,
    }));
  }
}

function* updateUserSaga(action: ReturnType<typeof actions.updateUser.started>) {
  try {
    const { payload } = action;
    const user: IUser = yield select((state: IRootReducer) => state.authReducer.user);
    const { data: { updateUser: response } }: { data: { updateUser: UpdateUserResponse } } = yield call(updateUser, user.id, payload);
    console.log('response: ', response);
    if (!response.isUpdated) {
      return;
    }

    const updatedUser = {
      ...user,
      ...response.user,
    };

    yield put(actions.getUser.done({ 
      params: action.payload,
      result: updatedUser,
    }));
  } catch (e) {
    console.log(e);
    yield put(actions.updateUser.failed({
      params: action.payload,
      error: e,
    }));
  }
}

export function* saga() {
  yield takeLatest(actions.registration.started, registration);
  yield takeLatest(actions.login.started, login);
  yield takeLatest(actions.logout, logout);
  yield takeLatest(actions.getUser.started, getUser);
  yield takeLatest(actions.getAllUsers.started, getAllUsers);
  yield takeLatest(actions.updateUser.started, updateUserSaga);
}
