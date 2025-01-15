import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstname
      lastname
      email
      created_at
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      firstname
      lastname
      email
      created_at
      posts {
        id
        title
        content
        created_at
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $firstname: String!, $lastname: String!, $email: String!) {
    updateUser(id: $id, input: { firstname: $firstname, lastname: $lastname, email: $email }) {
      id
      firstname
      lastname
      email
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      created_at
      user {
        id
        firstname
        lastname
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: Int!) {
    post(id: $id) {
      id
      title
      content
      created_at
      user {
        id
        firstname
        lastname
        email
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $userId: Int!) {
    createPost(title: $title, content: $content, userId: $userId) {
      id
      title
      content
      created_at
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: Int!, $title: String!, $content: String!) {
    updatePost(id: $id, input: { title: $title, content: $content }) {
      id
      title
      content
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`;