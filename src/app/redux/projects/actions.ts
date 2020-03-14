import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('auth');

export const getAllProjects = actionCreator.async<{}, []>('GET_ALL_PROJECTS');

export const createProject = actionCreator.async('CREATE_PROJECT');