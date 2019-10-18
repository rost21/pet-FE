import { combineReducers } from 'redux';
import { todoReducer } from './login';

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers({
  todos: todoReducer as any
});
