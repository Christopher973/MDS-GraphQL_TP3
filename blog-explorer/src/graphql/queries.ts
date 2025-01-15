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