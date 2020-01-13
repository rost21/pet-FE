import { combineReducers } from 'redux';
import { reducer as authReducer, IReducerShape } from './auth/reducer';

export interface IRootReducer {
  auth: IReducerShape;
}

export const rootReducer = combineReducers<IRootReducer>({
  auth: authReducer
});
