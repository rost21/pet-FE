import { actionCreatorFactory } from 'typescript-fsa';
import { ITask, UpdateTaskPayload, IComment } from 'app/types';

const actionCreator = actionCreatorFactory('task');

export const createTask = actionCreator.async<{
  title: string, 
  description: string, 
  type: string,
  assignTo: string
}, ITask, string>('CREATE_TASK');

export const updateTask = actionCreator.async<{ id: string, payload: UpdateTaskPayload }, ITask, string>('UPDATE_TASK');

export const setTaskModalVisible = actionCreator<{ visible: boolean, id: string }>('SET_TASK_MODAL_VISIBLE');

export const getSingleTask = actionCreator.async<string, ITask | null, string>('GET_SINGLE_TASK');

export const createComment = actionCreator.async<{ comment: string, author: string }, IComment, string>('CREATE_COMMENT');