import { combineReducers } from 'redux';
import { reducer as loginReducer, IReducerShape } from './login';

export interface IRootReducer {
  login: IReducerShape;
}

export const rootReducer = combineReducers<IRootReducer>({
  login: loginReducer as any
});
