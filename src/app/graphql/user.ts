import { client } from '../config/apollo';
import gql from 'graphql-tag';
import { ILoginUserVariables, UpdateUserPayload } from 'app/types';

const LOGIN = gql`
  query login($data: LoginPayload!) {
    login(data: $data) {
      isLoggedIn
      token
    }
  }
`;

const GET_USER = gql`
  query getUser($token: String!) {
    getUser(token: $token) {
      id
      firstname
      lastname
      username
      email
      gender
      phone
      dateOfBirth
      role
      isCustomer
      skills
      rankings
      about
    }
  }
`;

const REGISTER = gql`
  mutation register($data: RegisterPayload!) {
    register(data: $data) {
      isCreated
      message
    }
  }
`;

const GET_USERS = gql`
  query getUsers {
    users {
      id
      firstname
      lastname
      username
      email
      phone
      dateOfBirth
      role
      isCustomer
      skills
      rankings
      about
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $data: UpdateUserPayload!) {
    updateUser (id: $id, data: $data) {
      user {
        firstname
        lastname
        email
        gender
        phone
        dateOfBirth
        role
        skills
        rankings
        about
      }
      isUpdated
    }
  }
`;

export const login = (data: ILoginUserVariables) => 
	client.query({ query: LOGIN, variables: { data } });

export const getUser = (token: string) =>
	client.query({ query: GET_USER, variables: { token } });

export const register = (data: any) =>
	client.mutate({ mutation: REGISTER, variables: { data } });

export const getUsers = () =>
  client.query({ query: GET_USERS });
  
export const updateUser = (id: string, data: UpdateUserPayload) =>
  client.mutate({ mutation: UPDATE_USER, variables: { id, data } });