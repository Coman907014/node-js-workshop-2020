module.exports = `
  type User {
    _id: String!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    user(_id: ID!): User!
    users: [User!]!
  }
`;
