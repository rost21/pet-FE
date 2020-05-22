import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { ITask } from 'app/types';

export interface IReducerShape {
  isTaskModalVisible: boolean;
  selectedTaskId: string;
  task: ITask | null;
  isLoading: boolean;
}

const initialState: IReducerShape = {
  isTaskModalVisible: false,
  selectedTaskId: '',
  task: null,
  isLoading: false,
};

export const reducer = reducerWithInitialState(initialState)
  .cases(
    [
      actions.createTask.started, 
      actions.updateTask.started, 
      actions.getSingleTask.started,
      actions.createComment.started,
    ],
    (state): IReducerShape => ({
      ...state,
      isLoading: true,
    })
  )
  .case(
    actions.createTask.started,
    (state): IReducerShape => ({
      ...state,
      isLoading: true,
    })
  )
  .case(
    actions.updateTask.started,
    (state): IReducerShape => ({
      ...state,
      isLoading: true,
    })
  )
  .case(
    actions.setTaskModalVisible,
    (state, payload): IReducerShape => {
      const { visible, id } = payload;
      return {
        ...state,
        isTaskModalVisible: visible,
        selectedTaskId: id,
      };
    }
  )
  .case(
		actions.getSingleTask.started,
		(state): IReducerShape => ({
			...state,
			isLoading: true,
		})
  )
  .case(
		actions.getSingleTask.done,
		(state, payload): IReducerShape => ({
			...state,
			task: payload.result,
			isLoading: false,
		})
  );
