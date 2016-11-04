const schema = `
  type User {
    id: ID!
    email: String!
  }

  type Query {
    getUserById(id: ID!): User
    getUserByEmail(email: String!): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = schema;
