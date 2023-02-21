import gql from 'graphql-tag';

const typeDefs = gql`
  type Category {
    _id: ID!
    label: String!
    value: String!
    isAccept: Boolean
  }
`;

export default typeDefs;
