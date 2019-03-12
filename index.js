var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    getUsers: [User!],
    getUser(name:String!): User,
    setUser(name:String!):User
  }
  type User {
      name:String!,
      addr:String,
      tel:Int
  }
`);//
var root = {
    getUsers: () => Users,
    getUser:({name})=>Users.filter(word => word.name==name)[0],
    setUser: ({name}) =>  {
        Users.push(new User(name))
        return Users[User.length-1]
    }
};
class User{
    constructor(name) {
    this.name=name;
    this.addr="addr";
    this.tel=12;
    }
}

let Users=[new User("a")]

var app = express();
app.use('/', graphqlHTTP({schema: schema,rootValue: root,graphiql: true}));
app.listen(3000);
console.log("Serveur lancé sur le port 3000");