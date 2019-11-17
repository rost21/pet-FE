import { takeLatest, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';
import { toast } from 'react-toastify';
import { IRegisterUserResponse } from 'app/components/types';
import { history } from '../../../main';
import ROUTES from '../../routes';

function* registration(action: ReturnType<typeof actions.registration.started>) {
  console.log(action.payload);
  const response: IRegisterUserResponse = yield call(api.registration, action.payload);
  console.log(response);

  if (response.error) {
    const errors = response.error.errors;
    Object.keys(errors).map((key) =>
      toast(errors[key].message, {
        type: 'error',
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true
      })
    );
    return;
  }

  toast('Successful registration', {
    type: 'success',
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true
  });

  history.push(ROUTES.LOGIN);
}

export function* saga() {
  yield takeLatest(actions.registration.started, registration);
}
