import { client } from '../config/apollo';
import gql from 'graphql-tag';

const LOGIN = gql`
  query login($data: LoginPayload!) {
    login(data: $data) {
      isLoggedIn
      token
    }
  }
`

const GET_USER = gql`
  query getUser($token: String!) {
    getUser(token: $token) {
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
    }
  }
`;

const REGISTER = gql`
  mutation register($data: RegisterPayload!) {
    register(data: $data) {
      isCreated
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
    }
  }
`;

export const login = (data: { username: string, password: string }) => 
  client.query({ query: LOGIN, variables: { data } });

export const getUser = (token: string) =>
  client.query({ query: GET_USER, variables: { token } });

export const register = (data: { username: string, email: string, password: string, isCustomer: boolean }) =>
  client.mutate({ mutation: REGISTER, variables: { data } });

export const getUsers = () =>
  client.query({ query: GET_USERS });