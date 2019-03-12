var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    getUsers: [User!],
    getUser(n:Int!): User!
  }
  type User {
      name:String!,
      addr:String,
      tel:Int
  }
`);
var root = {
    getUsers: () =>  {return Users},
    getUser: ({n}) =>  {return Users[n]}
};
class User{
    constructor(name) {
    this.name=name;
    this.addr="addr";
    this.tel=12;
    }
}
let Users=[new User("toto"),new User("totos")]
var app = express();
app.use('/', graphqlHTTP({schema: schema,rootValue: root,graphiql: true}));
app.listen(3000);
console.log("Serveur lancé sur le port 3000");