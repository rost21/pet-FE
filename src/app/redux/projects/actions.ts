import { actionCreatorFactory } from 'typescript-fsa';
import { IProjects, IProject, UpdateProjectResponse } from 'app/types';

const actionCreator = actionCreatorFactory('auth');

export const getAllProjects = actionCreator.async<{}, IProjects, string>('GET_ALL_PROJECTS');

export const setProjects = actionCreator<IProjects>('SET_PROJECTS');

export const createProject = actionCreator.async('CREATE_PROJECT');

export const getSingleProject = actionCreator.async<string, IProject | null, string>('GET_SINGLE_PROJECT');

export const closeProject = actionCreator.async<string, UpdateProjectResponse, string>('CLOSE_PROJECT');