// Was getting an error for 'await server.start() before calling 'server.applyMiddleware()'
// used https://stackoverflow.com/questions/68354656/unhandledpromiserejectionwarning-error-you-must-await-server-start-before
// for solution. to wrap all the apolloServer stuff in an async function
// also had to change the port numbers to not be the same. 
const express = require('express');
const {ApolloServer } = require('apollo-server-express');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

async function startExpressApolloServer(){
  const { typeDefs, resolvers } = require('./schemas');
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();
  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 3002 }, resolve));
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
return {server,app};
}




startExpressApolloServer();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
   
  
  });
});
