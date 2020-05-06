export interface IRegisterUserVariables {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth?: string;
  isCustomer: boolean;
  phone?: string;
  skills?: string[];
  role?: string;
  about?: string;
}

export interface IRegisterUserResponse {
  isCreated: boolean;
  message?: string;
}

export interface ILoginUserVariables {
  username: string;
  password: string;
}

export interface ILoginUserResponse {
  isLoggedIn: boolean;
  token: string;
}

export interface IGetUserVariables {
  token: string;
}

export interface IGetUserResponse {
  id: string;
  username: string;
  email: string;
}

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  role: string;
  isCustomer: boolean;
  skills: string[];
  rankings: number;
  about: string;
}

export type IUsers = IUser[]

export interface ITask {
  id: string;
  title: string;
  description: string;
  type: string;
  reporter: IUser;
  assignTo: IUser;
  status: string
}

export type ITasks = ITask[]

export interface IProject {
  id: string;
  title: string;
  description: string;
  owner: IUser;
  status: string;
  members: IUser[];
  tasks: ITask[];
  startDate: string;
  endDate: string;
}

export type IProjects = IProject[]

export interface UpdateProjectResponse {
  project: IProject;
  isUpdated: boolean;
}