import { client } from '../config/apollo';
import gql from 'graphql-tag';
import { CreateProjectPayload } from 'app/types';

const GET_PROJECTS = gql`
  query projects {
    projects {
      id
      title
      description
      owner {
        id
        # firstname
        # lastname
        username
        # email
        # phone
        # dateOfBirth
        # role
        # isCustomer
        # skills
        # rankings
        # about
      }
      status
      members {
        id
        # firstname
        # lastname
        username
        # email
        # phone
        # dateOfBirth
        # role
        # isCustomer
        # skills
        # rankings
        # about
      }
      # tasks {
      #   id
      #   title
      #   description
      #   type
      #   reporter {
      #     id
      #     firstname
      #     lastname
      #     username
      #     email
      #     phone
      #     dateOfBirth
      #     role
      #     isCustomer
      #     skills
      #     rankings
      #     about
      #   }
      #   assignTo {
      #     id
      #     firstname
      #     lastname
      #     username
      #     email
      #     phone
      #     dateOfBirth
      #     role
      #     isCustomer
      #     skills
      #     rankings
      #     about
      #   }
      #   status
      # }
      startDate
      endDate
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    getProject (id: $id) {
      id
      title
      description
      owner {
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
      status
      members {
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
      tasks {
        id
        title
        description
        type
        reporter {
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
        assignTo {
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
        status
      }
      startDate
      endDate
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation updateProject ($id: ID!, $data: UpdateProjectPayload!) {
    updateProject (id: $id, data: $data) {
      project {
        id
        title
        description
        owner {
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
        status
        members {
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
        tasks {
          id
          title
          description
          type
          reporter {
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
          assignTo {
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
          status
        }
        startDate
        endDate
      }
      isUpdated
    }
  }
`;

const CREATE_PROJECT = gql`
  mutation createProject ($data: ProjectPayload!) {
    createProject (data: $data) {
      project {
        id
        title
        description
        owner {
          id
          username
        }
        status
        members {
          id
          username
        }
        startDate
        endDate
      }
      isCreated
    }
  }
`;

export const getProjects = () =>
	client.query({ query: GET_PROJECTS });

export const getProject = (id: string) => 
	client.query({ query: GET_PROJECT, variables: { id } });

export const updateProject = (id: string, data: any) =>
  client.mutate({ mutation: UPDATE_PROJECT, variables: { id, data }});

export const createProject = (data: CreateProjectPayload) =>
  client.mutate({ mutation: CREATE_PROJECT, variables: { data } });