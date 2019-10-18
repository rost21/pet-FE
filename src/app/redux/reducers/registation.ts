import { handleActions } from 'redux-actions';
import { IRootState } from './state';

const initialState: IRootState = {
  id: 1,
  text: 'Use Redux',
  completed: false
};

export const todoReducer = handleActions(
  {
    ['LOGIN']: (state) => {
      return { ...state, text: 'dsdsds' };
    }
  },
  initialState
);
