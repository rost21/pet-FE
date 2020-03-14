import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as actions from './actions';

interface IReducerShape {
  projects: [];
  isLoadingProjects: boolean;
}

const initialState: IReducerShape = {
  projects: [],
  isLoadingProjects: false,
};

export const reducer = reducerWithInitialState(initialState)
  .case(
    actions.createProject.started,
    (state): IReducerShape => ({
      ...state,
      isLoadingProjects: true,
    })
  )
  .case(
    actions.createProject.done,
    (state, payload): IReducerShape => ({
      ...state,
      projects: (payload.result as []),
      isLoadingProjects: false,
    })
  );
