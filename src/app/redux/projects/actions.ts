import { actionCreatorFactory } from 'typescript-fsa';
import { IProjects, IProject, UpdateProjectResponse, CreateProjectPayload } from 'app/types';

const actionCreator = actionCreatorFactory('auth');

export const getAllProjects = actionCreator.async<string, IProjects, string>('GET_ALL_PROJECTS');

export const setProjects = actionCreator<IProjects>('SET_PROJECTS');

export const createProject = actionCreator.async<CreateProjectPayload, IProject, string>('CREATE_PROJECT');

export const getSingleProject = actionCreator.async<string, IProject | null, string>('GET_SINGLE_PROJECT');

export const closeProject = actionCreator.async<string, UpdateProjectResponse, string>('CLOSE_PROJECT');

export const addMembersToProject = actionCreator.async<string[], UpdateProjectResponse, string>('ADD_MEMBERS_TO_PROJECT');

export const changeProjectTitle = actionCreator.async<string, UpdateProjectResponse, string>('CHANGE_PROJECT_TITLE');

export const changeProjectDescription = actionCreator.async<string, UpdateProjectResponse, string>('CHANGE_PROJECT_DESCRIPTION');

export const deleteUserFromMembers = actionCreator.async<string, UpdateProjectResponse, string>('DELETE_USER_FROM_MEMBERS');