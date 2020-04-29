

var express = require('express');
var graphqlHTTP = require('express-graphql');
var cors = require('cors')
var { buildSchema } = require('graphql');

// Initialize a GraphQL schema
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Root resolver
var root = {
  hello: () => 'Hello from NodeJS (Express + GraphQL)'
};

// Create an express server and a GraphQL endpoint
var app = express();

app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: schema,  // Must be provided
  rootValue: root,
  graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));