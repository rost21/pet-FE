import { actionCreatorFactory } from 'typescript-fsa';
import { IRegisterUserVariables, IRegisterUserResponse } from 'app/components/types';

const actionCreator = actionCreatorFactory('registration');

export const registration = actionCreator.async<
  IRegisterUserVariables,
  IRegisterUserResponse,
  string
>('REGISTRATION');
