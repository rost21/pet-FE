import { combineReducers } from 'redux';
import { reducer as authReducer, IReducerShape as IAuthReducerShape } from './auth/reducer';
import { reducer as projectReducer, IReducerShape as IProjectReducerShape } from './projects/reducer';

export interface IRootReducer {
  auth: IAuthReducerShape;
  project: IProjectReducerShape;
}

export const rootReducer = combineReducers<IRootReducer>({
  auth: authReducer,
  project: projectReducer
});
