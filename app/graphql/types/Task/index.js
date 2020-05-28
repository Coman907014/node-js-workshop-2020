module.exports = `
  type Task {
    _id: ID!
    description: String!
    completed: Boolean!
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    createTask(task: TaskInput): Task!
    updateTask(_id: ID!, task: TaskInput): Task!
    deleteTask(_id: ID!): Task!
  }

  input TaskInput {
    description: String!
    completed: Boolean!
  }
`;
