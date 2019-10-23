import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('LOGIN');

export const setText = actionCreator<string>('CLOSE');
