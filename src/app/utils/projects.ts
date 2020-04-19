import { IProjects, IUser, IProject } from "app/types";

export const findProjects = (projects: IProjects, searchValue: string) => {
  return projects.filter((project) => project.title.includes(searchValue))
}

export const changeViewProjects = (projects: IProjects, type: string, user: IUser) => {
  // console.log('user: ', user);
  // console.log('projects: ', projects);
  if (type === 'my') {
    // const t = 
    // console.log('t: ', t);
    return projects.filter(project => project.members.some(member => member.id === user.id));;
  }
  // const t = projects.filter(project => project.members.includes(user));
  return projects;
}

export const isUserOwnerProject = (user: IUser, project: IProject) => {
  return user.id === project.owner.id;
}
