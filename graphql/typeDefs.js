import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String
    email: String!
  }

  type UserAuth {
    token: String
    user: User
  }

  type Query {
    users: [User]
  }
  type Mutation {
    login(username: String!, password: String!): UserAuth!
  }
`;
