import { combineReducers } from 'redux';
import { reducer as loginReducer, IReducerShape } from './login';

export interface IRootState {
  login: IReducerShape;
}

export const rootReducer = combineReducers<IRootState>({
  login: loginReducer as any
});
