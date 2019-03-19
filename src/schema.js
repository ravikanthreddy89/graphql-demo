const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int
    posts: [Post]!
  }

  type Comment {
    id: ID!
    text: String!
    author: String!
  }

  type Post {
    id: ID!
    text: String!
    author: String
  }

  type Query {
    user: [User]!
  }

  input CreateUserInput {
    id: ID!
    name: String!
    age: Int
  }

  type Mutation {
    createUser(id: String, name: String, age: Int): User
    createUserMutation(argument: CreateUserInput): User
  }
`;

module.exports = typeDefs;
