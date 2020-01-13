import { RouteComponentProps } from 'react-router';

export interface IStateProps {
  isLoggedIn: boolean
}

export interface IDispatchProps {
  getUser: (token: string) => void;
}

export interface IProps extends RouteComponentProps, IStateProps, IDispatchProps {}