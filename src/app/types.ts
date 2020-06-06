export interface IRegisterUserVariables {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  gender: string;
  dateOfBirth?: string;
  isCustomer: boolean;
  phone?: string;
  location?: string;
  skills?: string[];
  role?: string;
  about?: string;
}

export type UserFields = 'email' | 'firstname' | 'lastname' | 'gender' | 'dateOfBirth' | 'phone' | 'location' | 'skills' | 'role' | 'about';

export type UpdateUserPayload = {
  [key in UserFields]?: IUser[UserFields]
}

export interface UpdateUserResponse {
  user: IUser;
  isUpdated: boolean;
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
  gender: string;
  location: string;
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
  type: 'bug' | 'improvement' | 'story';
  reporter: IUser;
  assignTo: IUser;
  status: 'ready' | 'wip' | 'done' | 'closed';
  creationDate: string;
  closedDate?: string;
  comments: IComment[];
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

export interface CreateProjectPayload {
  title: string;
  description: string;
  members: string[];
}

export interface CreateProjectResponse {
  project: IProject;
  isCreated: boolean;
}

export enum ProjectStatuses {
  NOT_PAID = 'NOT_PAID',
  PAID = 'PAID',
  CLOSED = 'CLOSED'
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  type: string;
  reporter: string;
  assignTo: string;
  status: string;
  creationDate: string;
}

export interface CreateTaskResponse {
  task: ITask;
  isCreated: boolean;
}

type TaskFields = 'title' | 'description' | 'type' | 'assignTo' | 'status';

export type UpdateTaskPayload = {
  [key in TaskFields]?: string;
};

export interface IComment {
  id: string;
  comment: string;
  author: IUser;
  postedDate: string;
}

export interface UpdateTaskResponse {
  task: ITask;
  isUpdated: boolean;
}

export interface CreateCommentPayload {
  comment: string;
  author: string;
  postedDate: string;
}

export interface CreateCommentResponse {
  comment: IComment;
  isCreated: boolean;
}

export type Tab = 'timeline' | 'about' | 'edit';