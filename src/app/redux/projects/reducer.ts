import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { IProjects, IProject } from 'app/types';

export interface IReducerShape {
  allProjects: IProjects;
  isLoading: boolean;
  project: IProject | null;
}

const initialState: IReducerShape = {
	allProjects: [],
	isLoading: false,
	project: null,
};

export const reducer = reducerWithInitialState(initialState)
	.cases(
		[
			actions.getAllProjects.started,
			actions.getSingleProject.started,
			actions.closeProject.started,
			actions.changeProjectTitle.started,
			actions.changeProjectDescription.started,
			actions.deleteUserFromMembers.started
		],
		(state): IReducerShape => ({
			...state,
			isLoading: true,
		})
	)
	.case(
		actions.addMembersToProject.started,
		(state): IReducerShape => ({
			...state,
			isLoading: true,
		})
	)
	.case(
		actions.getAllProjects.done,
		(state, payload): IReducerShape => ({
			...state,
			isLoading: false,
			allProjects: payload.result,
		})
	)
	.case(
		actions.setProjects,
		(state, payload): IReducerShape => ({
			...state,
			isLoading: false,
			allProjects: payload,
		})
	)
	.case(
		actions.getSingleProject.done,
		(state, payload): IReducerShape => ({
			...state,
			project: payload.result,
			isLoading: false,
		})
	)
	.case(
		actions.createProject.done,
		(state, payload): IReducerShape => ({
			...state,
			// projects: (payload.result as []),
			// isLoadingProjects: false,
		})
	);
