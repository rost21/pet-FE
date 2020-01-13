import { actionCreatorFactory } from 'typescript-fsa';
import { IRegisterUserVariables, IRegisterUserResponse, ILoginUserVariables, ILoginUserResponse, IGetUserVariables, IGetUserResponse } from 'app/redux/types';

const actionCreator = actionCreatorFactory('auth');

export const registration = actionCreator.async<
  IRegisterUserVariables,
  IRegisterUserResponse,
  string
>('REGISTRATION');

export const login = actionCreator.async<ILoginUserVariables, ILoginUserResponse, string>('LOGIN');

//type must be authoeized user
export const setUser = actionCreator<{ id: string, username: string, email: string }>('SET_USER');

export const logout = actionCreator('LOGOUT');

export const getUser = actionCreator.async<IGetUserVariables, IGetUserResponse, string>('GET_USER');