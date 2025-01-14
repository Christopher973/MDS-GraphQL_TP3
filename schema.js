// schema.js
const { gql } = require("apollo-server");

const typeDefs = gql`
  # Définition du type User
  type User {
    id: Int!
    firstname: String!
    lastname: String!
    email: String!
    created_at: String!
    posts: [Post]
  }

  # Définition du type Post
  type Post {
    id: Int!
    title: String!
    content: String!
    created_at: String!
    user: User!
  }

  # Définition du type Query
  type Query {
    users: [User]
    user(id: Int!): User
    posts: [Post]
    post(id: Int!): Post
  }

  # Définition du type Mutation
  type Mutation {
    createUser(firstname: String!, lastname: String!, email: String!): User
    createPost(title: String!, content: String!, userId: Int!): Post
  }
`;

module.exports = typeDefs;
