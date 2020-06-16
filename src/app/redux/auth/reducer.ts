import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { IUser, IUsers, Tab } from 'app/types';

export interface IReducerShape {
  user: IUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isLoadingUser: boolean;
  isLoadingUsers: boolean;
  allUsers: IUsers | null;
  activeTab: Tab;
  editMode: boolean;
}

const initialState: IReducerShape = {
	user: null,
  isLoggedIn: false,
  isLoading: false,
  isLoadingUser: false,
  isLoadingUsers: false,
  allUsers: null,
  activeTab: 'about',
  editMode: false,
};

export const reducer = reducerWithInitialState(initialState)
  .cases(
    [actions.registration.started, actions.registration.failed,
    actions.login.started, actions.login.failed],
    (state): IReducerShape => ({
      ...state,
      isLoading: !state.isLoading,
    })  
  )
  .case(
		actions.registration.done,
		(state): IReducerShape => ({
			...state,
			isLoading: false,
		})
  )
	.case(
		actions.login.done,
		(state): IReducerShape => ({
			...state,
      isLoggedIn: true,
      isLoading: false,
		})
	)
	.case(
		actions.logout,
		(state): IReducerShape => ({
			...state,
			user: null,
			isLoggedIn: false,
		})
	)
	.case(
		actions.getUser.started,
		(state): IReducerShape => ({
			...state,
			isLoadingUser: true,
		})
	)
	.case(
		actions.getUser.done,
		(state, payload): IReducerShape => ({
			...state,
			user: payload.result,
			isLoggedIn: true,
			isLoadingUser: false,
		})
	)
	.case(
		actions.getAllUsers.started,
		(state): IReducerShape => ({
			...state,
			isLoadingUsers: true,
		})
	)
	.case(
		actions.getAllUsers.done,
		(state, payload): IReducerShape => ({
			...state,
			isLoadingUsers: false,
			allUsers: payload.result,
		})
  )
  .case(
		actions.changeActiveTab,
		(state, payload): IReducerShape => ({
      ...state,
      activeTab: payload,
		})
  )
  .case(
		actions.toggleEditMode,
		(state, payload): IReducerShape => ({
      ...state,
      editMode: payload,
		})
  )
  .case(
		actions.updateUser.started,
		(state): IReducerShape => ({
      ...state,
      isLoadingUser: true,
		})
  );
