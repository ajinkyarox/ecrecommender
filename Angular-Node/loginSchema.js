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
var flag=false;

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
          resolve: async function (root, params) {
            var loginModel = null;
            var newLogin=null; 
            LoginModel.find({username:params.username}).then(doc => {
              if(doc[0]==null){
                loginModel=new LoginModel(params);
                newLogin = loginModel.save()
  
               
              }
              
            })
            .catch(err => {
              console.error(err)
            })
            
    const result = await LoginModel.findOne({username:params.username}).exec();
            return result
          }
        },
        
    
      }
    }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});