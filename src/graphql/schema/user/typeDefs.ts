import { gql } from 'graphql-tag';
const typeDefs = gql`
  enum Gender {
    male
    female
  }

  type User {
    id: ID!
    email: String!
    name: String!
    family_name: String!
    username: String!
    avatar: String
    gender: Gender
    email_verified: Boolean
    markers: [Marker]
    isAdmin: Boolean
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
    userByEmail(email: String!): User
    userByFilter(filter: UsersByFilterInput): [User]
  }

  extend type Mutation {
    updateUser(input: UpdateUserInput): UpdateUserResponse
    deleteUser(input: DeleteUserInput): DeleteUserResponse
  }

  input UpdateUserInput {
    _id: ID!
    email: String
    name: String
    family_name: String
    username: String
    avatar: String
    gender: Gender
    email_verified: Boolean
    isAdmin: Boolean
  }

  type UpdateUserResponse {
    user: User
  }

  input DeleteUserInput {
    _id: ID!
  }

  type DeleteUserResponse {
    user: User
  }

  input UsersByFilterInput {
    email: String
    name: String
    family_name: String
    username: String
    gender: Gender
  }
`;

export default typeDefs;
