var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LoginModel = require('./login');

var loginType = new GraphQLObjectType({
    name: 'login',
    fields: function () {
      return {
        
        username: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      }
    }
  });

  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        book: {
          type: loginType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const bookDetails = BookModel.findById(params.id).exec()
            if (!bookDetails) {
              throw new Error('Error')
            }
            return bookDetails
          }
        }
      }
    }
  });

  var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addLogin: {
          type: loginType,
          args: {

              username: {
                type: GraphQLString
              },
              password: {
                type: GraphQLString
              }
          },
          resolve: function (root, params) {
            const loginModel = new LoginModel(params);
            const newLogin = loginModel.save();
            if (!newLogin) {
              throw new Error('Error');
            }
            return newLogin
          }
        },
        
    
      }
    }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});