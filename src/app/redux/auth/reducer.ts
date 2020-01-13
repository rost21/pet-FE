import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';

export interface IReducerShape {
  user: { 
    id: string
    username: string
    email: string
  } | null;
  isLoggedIn: boolean;
}

const initialState: IReducerShape = {
  user: null,
  isLoggedIn: false
};

export const reducer = reducerWithInitialState(initialState)
  .case(
    actions.setUser,
    (state, payload): IReducerShape => ({
      ...state,
      user: payload,
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
  );
