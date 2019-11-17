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
