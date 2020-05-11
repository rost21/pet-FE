import { IProjects, IUser, IProject, ProjectStatuses } from 'app/types';
import { IUserExtend } from 'app/scenes/MainPage/MainContent/Projects/ProjectPage/ProjectPage';

export const findProjects = (projects: IProjects, searchValue: string) => {
  return projects.filter((project) => project.title.includes(searchValue));
};

export const changeViewProjects = (projects: IProjects, type: string, user: IUser) => {
  // console.log('user: ', user);
  // console.log('projects: ', projects);
  if (type === 'my') {
    // const t = 
    // console.log('t: ', t);
    return projects.filter(project => project.members.some(member => member.id === user.id));
  }
  // const t = projects.filter(project => project.members.includes(user));
  return projects;
};

export const isUserOwnerProject = (user: IUser, project: IProject) => {
  return user.id === project.owner.id;
};

export const getDevelopersNotInProject = (allDevelopers: IUserExtend[], project: IProject) => {
  if (!allDevelopers || !project) {
    return null;
  }

  return allDevelopers.filter(developer => project.members.every(member => member.id !== developer.id));
};

export const isProjectClosed = (project: IProject) => project.status === ProjectStatuses.CLOSED;

export const cutString = (string: string, length: number) => {
  if (!string) {
    return null;
  }
  return string.substr(0, length) + ' ...';
};