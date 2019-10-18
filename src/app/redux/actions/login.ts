// import { createAction } from 'redux-actions';
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('LOGIN');

export const setText = actionCreator('CLOSE');
// export const setText = createAction('LOGIN');
