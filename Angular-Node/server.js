

var express = require('express');
var graphqlHTTP = require('express-graphql');
var cors = require('cors')
var { buildSchema } = require('graphql');

// Initialize a GraphQL schema
var schema = require('./loginSchema');

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

const dbConfig = require('./database.config.js');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));