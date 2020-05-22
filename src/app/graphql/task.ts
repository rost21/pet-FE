import { client } from '../config/apollo';
import gql from 'graphql-tag';
import { CreateTaskPayload, UpdateTaskPayload, CreateCommentPayload } from 'app/types';

const CREATE_TASK = gql`
  mutation createTask ($projectId: ID!, $data: CreateOrUpdateTaskPayload!) {
    createTask (projectId: $projectId, data: $data) {
      task {
        id
        title
        description
        reporter {
          id
          username
        }
        assignTo {
          id
          username
        }
        status
        type
        creationDate
      }
      isCreated
    }
  }
`;

const UPDATE_TASK = gql`
  mutation updateTask ($id: ID!, $data: CreateOrUpdateTaskPayload!) {
    updateTask (id: $id, data: $data) {
      task {
        id
        title
        description
        reporter {
          id
          username
          firstname
          lastname
        }
        assignTo {
          id
          username
          firstname
          lastname
        }
        status
        type
        creationDate
        closedDate
        comments {
          id
          comment
          author {
            id
            username
            firstname
            lastname
          }
          postedDate
        }
      }
      isUpdated
    }
  }
`;

const GET_TASK = gql`
  query getTask ($id: ID!) {
    getTask (id: $id) {
      id
      title
      description
      type
      reporter {
        id 
        username
        firstname
        lastname
      }
      assignTo {
        id
        username
        firstname
        lastname
      }
      status
      creationDate
      closedDate
      comments {
        id
        comment
        author {
          id
          username
          firstname
          lastname
        }
        postedDate
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation createComment ($taskId: ID!, $data: CreateCommentPayload!) {
    createComment (taskId: $taskId, data: $data) {
      comment {
        id
        comment
        author {
          id
          username
          firstname
          lastname
        }
        postedDate
      }
      isCreated
    }
  }
`;

export const createTask = (projectId: string, data: CreateTaskPayload) =>
  client.mutate({ mutation: CREATE_TASK, variables: { projectId, data } });

export const updateTask = (id: string, data: UpdateTaskPayload) =>
  client.mutate({ mutation: UPDATE_TASK, variables: { id, data } });

export const getTask = (id: string) => 
  client.query({ query: GET_TASK, variables: { id } });
  
export const createComment = (taskId: string, data: CreateCommentPayload) =>
  client.mutate({ mutation: CREATE_COMMENT, variables: { taskId, data } });