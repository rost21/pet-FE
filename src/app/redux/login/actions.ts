import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('login');

export const setText = actionCreator<string>('CLOSE');
