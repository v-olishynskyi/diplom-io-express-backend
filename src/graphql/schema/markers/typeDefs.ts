import gql from 'graphql-tag';

const typeDefs = gql`
  type Marker {
    _id: ID!
    latitude: Float!
    longitude: Float!
    name: String!
    description: String
    owner: User
    category: Category
  }

  extend type Query {
    markers: [Marker]
    marker(id: ID!): Marker
  }
`;

export default typeDefs;
