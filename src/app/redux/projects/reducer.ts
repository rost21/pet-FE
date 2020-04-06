import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as actions from './actions';
import { IProjects, IProject } from "app/types";

export interface IReducerShape {
  projects: IProjects;
  isLoading: boolean;
  project: IProject | null;
}

const initialState: IReducerShape = {
  projects: [],
  isLoading: false,
  project: null,
};

export const reducer = reducerWithInitialState(initialState)
  .case(
    actions.getAllProjects.started,
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
      projects: payload.result,
    })
  )
  .case(
    actions.setProjects,
    (state, payload): IReducerShape => ({
      ...state,
      isLoading: false,
      projects: payload,
    })
  )
  .case(
    actions.getSingleProject.started,
    (state): IReducerShape => ({
      ...state,
      isLoading: true,
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
    actions.closeProject.started,
    (state): IReducerShape => ({
      ...state,
      isLoading: true,
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
