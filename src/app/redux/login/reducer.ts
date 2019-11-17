import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';

export interface IReducerShape {
  id: number;
  text: string;
  completed: boolean;
}

const initialState: IReducerShape = {
  id: 1,
  text: 'Use Redux',
  completed: false
};

export const reducer = reducerWithInitialState(initialState).case(
  actions.setText,
  (state, payload): IReducerShape => ({
    ...state,
    text: payload
  })
);
