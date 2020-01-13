export interface IRegisterUserVariables {
  username: string;
  email: string;
  password: string;
}

export interface IRegisterUserResponse {
  createdUser: IRegisterUserVariables;
  isUserCreated: boolean;
  error?: any;
}

export interface ILoginUserVariables {
  username: string;
  password: string;
}

export interface ILoginUserResponse {
  isLoggedIn: boolean;
  id: string;
  username: string;
  email: string;
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