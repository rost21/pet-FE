import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { IUser } from 'app/types';

export interface IReducerShape {
  user: IUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const initialState: IReducerShape = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
};

export const reducer = reducerWithInitialState(initialState)
  .case(
    actions.login.done,
    (state): IReducerShape => ({
      ...state,
      isLoggedIn: true,
    })
  )
  .case(
    actions.logout,
    (state): IReducerShape => ({
      ...state,
      user: null,
      isLoggedIn: false,
    })
  )
  .case(
    actions.getUser.started,
    (state): IReducerShape => ({
      ...state,
      isLoading: true,
    })
  )
  .case(
    actions.getUser.done,
    (state, payload): IReducerShape => ({
      ...state,
      user: payload.result,
      isLoggedIn: true,
      isLoading: false,
    })
  );
