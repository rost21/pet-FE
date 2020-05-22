import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as actions from './actions';
import { createTask, updateTask, getTask, createComment } from 'app/graphql/task';
import { IProject, IUser, CreateTaskResponse, UpdateTaskResponse, ITask, CreateCommentResponse } from 'app/types';
import { IRootReducer } from '../rootReducer';
import { showNotification } from 'app/utils/notifications';
import { getSingleProject } from '../project/actions';

const now = dayjs.extend(utc).utc().valueOf();

function* createNewTask(action: ReturnType<typeof actions.createTask.started>) {
  try {
    const { title, description, type, assignTo } = action.payload;
    const user: IUser = yield select((state: IRootReducer) => state.authReducer.user);
    const project: IProject = yield select((state: IRootReducer) => state.projectsReducer.project);

    const payload = { 
      title, 
      description, 
      type, 
      assignTo, 
      reporter: user.id, 
      status: 'ready',
      creationDate: `${now}`,
    };

    const { data: { createTask: response } }: { data: { createTask: CreateTaskResponse } } = yield call(createTask, project.id, payload);
    
    if (!response.isCreated) {
      return;
    }

    const updatedProject = {
      ...project,
      tasks: [...project.tasks, response.task],
    };

    yield put(getSingleProject.done({
      params: project.id,
      result: updatedProject,
    }));

    yield showNotification(`Task ${title} created`, 'success');
  } catch (e) {
    console.log(e);
    yield put(actions.createTask.failed({
      params: action.payload,
      error: e,
    }));
  }
}

function* updateTaskSaga(action: ReturnType<typeof actions.updateTask.started>) {
  try {
    const { id, payload } = action.payload;
    const project: IProject = yield select((state: IRootReducer) => state.projectsReducer.project);
    const task: ITask = yield select((state: IRootReducer) => state.tasksReducer.task);

    const { data: { updateTask: response } }: { data: { updateTask: UpdateTaskResponse } } = yield call(updateTask, id, payload);

    if (!response.isUpdated) {
      return;
    }
 
    const updatedProject = {
      ...project,
      tasks: project.tasks.map(task => task.id === id ? ({ ...task, ...response.task }) : task),
    };

    yield put(getSingleProject.done({
      params: project.id,
      result: (updatedProject as IProject),
    }));

    const updatedTask = { ...task, ...response.task };

    yield put(actions.getSingleTask.done({
      params: id,
      result: (updatedTask as ITask),
    }));
  } catch (e) {
    console.log(e);
    yield put(actions.updateTask.failed({
      params: action.payload,
      error: e,
    }));
  }
}

function* getSingleTask(action: ReturnType<typeof actions.getSingleTask.started>) {
  try {
    const id = action.payload;
    const { data: { getTask: response } }: { data: { getTask: ITask } } = yield call(getTask, id);

    if (!response) {
      return;
    }

    yield put(actions.getSingleTask.done({
      params: id,
      result: response,
    }));
  } catch (e) {
    console.log(e);
    yield put(actions.getSingleTask.failed({
      params: action.payload,
      error: e,
    }));
  }
}

function* createNewComment (action: ReturnType<typeof actions.createComment.started>) {
  try {
    const { author, comment } = action.payload;
    const id = yield select((state: IRootReducer) => state.tasksReducer.selectedTaskId);
    const task: ITask = yield select((state: IRootReducer) => state.tasksReducer.task);

    const payload = {
      author,
      comment,
      postedDate: `${now}`,
    };

    const { data: { createComment: response } }: { data: { createComment: CreateCommentResponse } } = yield call(createComment, id, payload);

    if (!response.isCreated) {
      return;
    }

    const updatedTask = {
      ...task,
      comments: [...task.comments, response.comment],
    };

    yield put(actions.getSingleTask.done({
      params: id,
      result: updatedTask,
    }));
  } catch (e) {
    console.log(e);
    yield put(actions.createComment.failed({
      params: action.payload,
      error: e,
    }));
  }
}

export function* saga() {
  yield takeLatest(actions.createTask.started, createNewTask);
  yield takeLatest(actions.updateTask.started, updateTaskSaga);
  yield takeLatest(actions.getSingleTask.started, getSingleTask);
  yield takeLatest(actions.createComment.started, createNewComment);
}