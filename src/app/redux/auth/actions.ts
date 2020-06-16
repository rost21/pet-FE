import { actionCreatorFactory } from 'typescript-fsa';
import {
  IRegisterUserVariables,
  ILoginUserVariables,
  ILoginUserResponse,
  IGetUserVariables,
  IUser,
  IUsers,
  Tab,
  UpdateUserPayload,
} from '../../types';

const actionCreator = actionCreatorFactory('auth');

export const registration = actionCreator.async<
  IRegisterUserVariables,
  null,
  string
>('REGISTRATION');

export const login = actionCreator.async<ILoginUserVariables, ILoginUserResponse, string>('LOGIN');

export const logout = actionCreator('LOGOUT');

export const getUser = actionCreator.async<IGetUserVariables | any, IUser, string>('GET_USER');

export const getAllUsers = actionCreator.async<{}, IUsers, string>('GET_ALL_USERS');

export const changeActiveTab = actionCreator<Tab>('CHANGE_ACTIVE_TAB');

export const toggleEditMode = actionCreator<boolean>('TOGGLE_EDIT_MODE');

export const updateUser = actionCreator.async<UpdateUserPayload, IUser, string>('UPDATE_USER');