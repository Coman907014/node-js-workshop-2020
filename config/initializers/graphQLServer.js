const { GraphQLServer } = require('graphql-yoga');

const schema = require('../../app/graphql/');

module.exports = callback => {
  const options = {
    port: process.env.PORT || '4000',
    endpoint: '/graphql',
    playground: '/playground'
  };

  const server = new GraphQLServer({
    schema,
  });
  
  console.log(`process.env.PORT +'1'` , process.env.PORT)
  // server.start(options, ({ port }) => {
  //   console.log(`🚀 GraphQL Server is running on http://localhost:${ port }`);
  // });

  callback();
};
