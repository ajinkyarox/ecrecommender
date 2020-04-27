const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
let port = process.env.PORT || 3000;

let schema = buildSchema(`
    type Query {
        msg: String
    }
`);


let root = {
    msg: () => {
        return 'Hello World!';
    }
};



const app = express();
app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));




app.listen(port);

console.log('GraphQL API Server up and running at localhost:' + port);