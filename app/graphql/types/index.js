const { mergeTypes } = require('merge-graphql-schemas');

const User = require('./User/');
const Task = require('./Task/');

const typeDefs = [User, Task];

module.exports = mergeTypes(typeDefs);
