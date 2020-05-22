import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { IProjects, IProject } from 'app/types';
import { createTask, updateTask } from '../task/actions';

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
      actions.deleteUserFromMembers.started,
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
    actions.createProject.started,
    (state): IReducerShape => ({
      ...state,
      isLoading: true,
    })
  )
  .case(
    createTask.started,
    (state): IReducerShape => ({
      ...state,
      isLoading: true,
    })
  )
  .case(
    updateTask.started,
    (state): IReducerShape => ({
      ...state,
      isLoading: true,
    })
  );
