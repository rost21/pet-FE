import { combineReducers } from 'redux';
import { reducer as authReducer, IReducerShape as IAuthReducerShape } from './auth/reducer';
import { reducer as projectsReducer, IReducerShape as IProjectsReducerShape } from './project/reducer';
import { reducer as tasksReducer, IReducerShape as ITasksReducerShape } from './task/reducer';

export interface IRootReducer {
  authReducer: IAuthReducerShape;
  projectsReducer: IProjectsReducerShape;
  tasksReducer: ITasksReducerShape;
}

export const rootReducer = combineReducers<IRootReducer>({
  authReducer: authReducer,
  projectsReducer: projectsReducer,
  tasksReducer: tasksReducer
});
