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
var ProductModel=require('./products')
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

  var productType = new GraphQLObjectType({
    name: 'products',
    fields: function () {
      return {
        
        name: {
          type: GraphQLString
        },
        type: {
          type: GraphQLString
        },
        details: {
          type: GraphQLString
        }
      }
    }
  });



  
  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        login: {
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
            const res=await LoginModel.findOne({username:params.username,password:params.password})
            console.log(res)
            return res          
          }
        },
        products:{
          type:new GraphQLList(productType),
          resolve: async function (root, params) {
            
            return await ProductModel.find({})          
          }
        }
      }
    }
  });

  var mutation = new GraphQLObjectType({
    name: 'Mutation',
    
    fields: function () {
      
      return {
        deleteProduct: {
          type: productType,
          args :{
            name: {
              type: GraphQLString
            },
            type: {
              type: GraphQLString
            },
            details: {
              type: GraphQLString
            }
          },
          resolve: async function(root,params){
            ProductModel.deleteOne({name:params.name}, function (err) {
              if(err) console.log(err);
              console.log("Successful deletion");
            });
          }
        },
        updateProduct: {
type: productType,
args :{
  name: {
    type: GraphQLString
  },
  type: {
    type: GraphQLString
  },
  details: {
    type: GraphQLString
  }
},
resolve: async function(root,params){
  var productModel = null;
  var newProduct=null; 
  const filter = { name: params.name };
const update = { type:params.type,details:params.details };

// `doc` is the document _after_ `update` was applied because of
// `new: true`
let doc = await ProductModel.findOneAndUpdate(filter, update, {
  new: true
});
return doc;
}
        },
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
        addProduct:{
type:productType,
args:{
  name: {
    type: GraphQLString
  },
  type: {
    type: GraphQLString
  },
  details: {
    type: GraphQLString
  }
},
resolve: async function(root,params){
  var productModel = null;
  var newProduct=null; 
  ProductModel.find({name:params.name}).then(doc => {
    if(doc[0]==null){
      productModel=new ProductModel(params);
      newProduct = productModel.save()
}
    
  })
  .catch(err => {
    console.error(err)
  })
  
const result = await LoginModel.findOne({name:params.name}).exec();
  return result
}
        }
    
      }
    }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});