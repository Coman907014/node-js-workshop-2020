const { mergeResolvers } = require('merge-graphql-schemas');

const User = require('./User/');
const Task = require('./Task/');

const resolvers = [User, Task];

module.exports = mergeResolvers(resolvers);
