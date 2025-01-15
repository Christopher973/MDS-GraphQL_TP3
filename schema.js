const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: Int!
    firstname: String!
    lastname: String!
    email: String!
    created_at: String!
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String!
    content: String!
    created_at: String!
    user: User!
  }

  input CreateUserInput {
    firstname: String!
    lastname: String!
    email: String!
  }

  input UpdateUserInput {
    firstname: String!
    lastname: String!
    email: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
  }

  input UpdatePostInput {
    title: String!
    content: String!
  }

  type Query {
    users: [User]
    user(id: Int!): User
    posts: [Post]
    post(id: Int!): Post
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: Int!, input: UpdateUserInput!): User
    createPost(title: String!, content: String!, userId: Int!): Post
    updatePost(id: Int!, input: UpdatePostInput!): Post
    deletePost(id: Int!): Post
  }
`;

module.exports = typeDefs;
