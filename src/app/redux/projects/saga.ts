import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as actions from './actions';
import { getProjects, getProject, updateProject } from 'app/graphql/project';
import { IProjects, IProject, UpdateProjectResponse } from 'app/types';
import { IRootReducer } from '../rootReducer';

function* getAllProjects() {
  try {
    const { data: { projects: response } }: { data: { projects: IProjects } } = yield call(getProjects);

    yield put(actions.getAllProjects.done({
      params: '',
      result: response,
    }));
  } catch (e) {
    console.log(e);
    yield put(actions.getAllProjects.failed({
      params: '',
      error: e,
    }));
  }
}

function* getSingleProject(action: ReturnType<typeof actions.getSingleProject.started>) {
  try {
    const id = action.payload;
    const { data: { getProject: response } }: { data: { getProject: IProject }} = yield call(getProject, id);

    if (!response) {
      return;
    }

    yield put(actions.getSingleProject.done({
      params: id,
      result: response,
    }));
  } catch (e) {
    console.log(e);
    yield put(actions.getSingleProject.failed({
      params: action.payload,
      error: e,
    }));
  }
}

function* closeProject(action: ReturnType<typeof actions.closeProject.started>) {
  try {
    const project: IProject = yield select((state: IRootReducer) => state.project.project);
    const id = action.payload;

    const now = dayjs.extend(utc).utc().valueOf();
    const payload = { status: 'CLOSED', endDate: `${now}` };

    const { data: { updateProject: response } }: { data: { updateProject: UpdateProjectResponse } } = yield call(updateProject, id, payload);

    if (!response.isUpdated) {
      return;
    }

    const updatedProject = {
      ...project,
      status: 'CLOSED',
      endDate: now.toString(),
    };

    yield put(actions.getSingleProject.done({
      params: id,
      result: updatedProject,
    }));
  } catch (e) {
    console.log(e);
    yield put(actions.closeProject.failed({
      params: action.payload,
      error:e
    }));
  }
}

function* addMembersToProject(action: ReturnType<typeof actions.addMembersToProject.started>) {
  try {
    const ids = action.payload;
    const project: IProject = yield select((state: IRootReducer) => state.project.project);
    const projectIds = project.members.map(member => member.id);

    const payload = { members: [...new Set([...projectIds, ...ids])] };

    const { data: { updateProject: response } }: { data: { updateProject: UpdateProjectResponse } } = yield call(updateProject, project.id, payload); 

    if (!response.isUpdated) {
      return;
    }

    yield put(actions.getSingleProject.done({
      params: project.id,
      result: response.project,
    }));
  } catch (e) {
    console.log(e);
    yield put(actions.addMembersToProject.failed({
      params: action.payload,
      error: e,
    }));
  }
}

function* changeProjectTitle(action: ReturnType<typeof actions.changeProjectTitle.started>) {
  try {
    const changedTitle = action.payload;
    const project: IProject = yield select((state: IRootReducer) => state.project.project);

    const payload = { title: changedTitle };
    const { data: { updateProject: response } }: { data: { updateProject: UpdateProjectResponse } } = yield call(updateProject, project.id, payload);
    
    if (!response.isUpdated) {
      return;
    }

    const updatedProject = {
      ...project,
      title: changedTitle,
    };

    yield put(actions.getSingleProject.done({
      params: project.id,
      result: updatedProject,
    }));
  } catch (e) {
    console.log(e);
    yield put(actions.changeProjectTitle.failed({
      params: action.payload,
      error: e,
    }));
  }
}

function* changeProjectDescription(action: ReturnType<typeof actions.changeProjectDescription.started>) {
  try {
    const changedDescription = action.payload;
    const project: IProject = yield select((state: IRootReducer) => state.project.project);

    const payload = { description: changedDescription };
    const { data: { updateProject: response } }: { data: { updateProject: UpdateProjectResponse } } = yield call(updateProject, project.id, payload);
    
    if (!response.isUpdated) {
      return;
    }

    const updatedProject = {
      ...project,
      description: changedDescription,
    };

    yield put(actions.getSingleProject.done({
      params: project.id,
      result: updatedProject,
    }));
  } catch (e) {
    console.log(e);
    yield put(actions.changeProjectTitle.failed({
      params: action.payload,
      error: e,
    }));
  }
}

// function* deleteUserFromMembers(action: ReturnType<typeof actions.deleteUserFromMembers.started>) {
//   try {
//     const id = action.payload;
//     const project: IProject = yield select((state: IRootReducer) => state.project.project);

//     const payload = { members: changedDescription };
//     const { data: { updateProject: response } }: { data: { updateProject: UpdateProjectResponse } } = yield call(updateProject, project.id, payload);
    
//     if (!response.isUpdated) {
//       return;
//     }

//     const updatedProject = {
//       ...project,
//       description: changedDescription,
//     }

//     yield put(actions.getSingleProject.done({
//       params: project.id,
//       result: updatedProject,
//     }))
//   } catch (e) {
//     console.log(e);
//     yield put(actions.changeProjectTitle.failed({
//       params: action.payload,
//       error: e,
//     }))
//   }
// }

// function* findProjects(action: ReturnType<typeof actions.findProjects>) {
//   const searchValue = action.payload;
//   const { projects, projectsForSearch }: { projects: IProjects, projectsForSearch: IProjects } = yield select((state: IRootReducer) => state.project);
  
//   console.log('projects: ', projects);
//   console.log('projectsForSearch: ', projectsForSearch);

//   if (!searchValue.length) {
//     yield put(actions.setProjects(projects));
//     return;
//   }

//   const filtered = projectsForSearch.filter(project => project.title.includes(searchValue));
//   yield put(actions.setProjects(filtered));
// }

export function* saga() {
  yield takeLatest(actions.getAllProjects.started, getAllProjects);
  yield takeLatest(actions.getSingleProject.started, getSingleProject);
  yield takeLatest(actions.closeProject.started, closeProject);
  yield takeLatest(actions.addMembersToProject.started, addMembersToProject);
  yield takeLatest(actions.changeProjectTitle.started, changeProjectTitle);
  yield takeLatest(actions.changeProjectDescription.started, changeProjectDescription);
  // yield takeLatest(actions.deleteUserFromMembers.started, deleteUserFromMembers);
}
