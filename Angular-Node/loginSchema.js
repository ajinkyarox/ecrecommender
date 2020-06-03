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
var PurchaseDetails=require('./purchasedetails')
var LikedProducts=require('./likedproducts')
var UnlikedProducts=require('./unlikedproducts')
var flag=false;
var score=0;
var uname='';
var recProductsType = new GraphQLObjectType({
  name: 'recproducts',
  fields: function () {
    return {
      username: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      
      type: {
        type: GraphQLString
      }

    }
  }
});

var likedProductsType = new GraphQLObjectType({
  name: 'likedproducts',
  fields: function () {
    return {
      
      username: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      
      type: {
        type: GraphQLString
      }
    }
  }
});

var unlikedProductsType = new GraphQLObjectType({
  name: 'unlikedproducts',
  fields: function () {
    return {
      
      username: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      type: {
        type: GraphQLString
      }
    }
  }
});


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

  var purchaseDetailsType = new GraphQLObjectType({
    name: 'purchasedetails',
    fields: function () {
      return {
        
        name: {
          type: GraphQLString
        },
        username: {
          type: GraphQLString
        },
        count: {
          type: GraphQLString
        }
      }
    }
  });

  
  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        recproducts:{
          type:GraphQLList(recProductsType),
          args:{
            username: {
              type: GraphQLString
            },
            name: {
              type: GraphQLString
            },
            
            type: {
              type: GraphQLString
            }
      
          },
          resolve: async function (root, params) {
            var lpunarray=await LikedProducts.find({type:params.type})
            var lp=await LikedProducts.find({username:params.username,type:params.type})
            
            
            for(let i=0;i<lpunarray.length;i++) {
              
              if(lpunarray[i].username!=params.username){
                var tempsc=0
                var smarray=await LikedProducts.find({username:lpunarray[i].username,type:params.type})
                for(let j=0;j<lp.length;j++){
                  for(let k=0;k<smarray.length;k++){
                    if(lp[j].name==smarray[k].name && lp[j].type==params.type){
                      tempsc=tempsc+1
                      
                    }
                  }
                }
                if(score<tempsc){
                  score=tempsc
                  
                  uname=lpunarray[i].username

                }
              }
            }
            console.log("Username "+uname+" score "+score)
             var unlp=await UnlikedProducts.find({username:params.username,type:params.type})
             
            var rc=await LikedProducts.find({username:uname,type:params.type})
             
            for(let i=0;i<rc.length;i++){
              if(rc[i].name==params.name){
                  
                rc.splice(i,1)
                
              }
              for(let j=0;j<unlp.length;j++) {
                if(rc[i].name==unlp[j].name){
                  
                  rc.splice(i,1)
                }
                
              }
            }
            
            return rc          
          }
        },
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
        },
        unlikedproducts:{
type:unlikedProductsType,
args: {
  username: {
    type: GraphQLString
  },
  name: {
    type: GraphQLString
  },
  
  type: {
    type: GraphQLString
  }

},
resolve: async function (root, params) {
  console.log(params.username+' '+params.name)
  const res=await UnlikedProducts.findOne({username:params.username,name:params.name})
  console.log(res)
  return res          
}
        },
        likedproducts:{
          type: likedProductsType,
          args: {
            username: {
              type: GraphQLString
            },
            name: {
              type: GraphQLString
            },
            
            type: {
              type: GraphQLString
            }
      
          },
          resolve: async function (root, params) {
            console.log(params.username+' '+params.name)
            const res=await LikedProducts.findOne({username:params.username,name:params.name})
            console.log(res)
            return res          
          }
        }
      }
    }
  });

  var mutation = new GraphQLObjectType({
    name: 'Mutation',
    
    fields: function () {
      
      return {
addUnlikedProducts:{

  type:unlikedProductsType,
  args :{
    
    username: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    
    type: {
      type: GraphQLString
    }

  },
  
  resolve: async function(root,params){
    var pdmodel = null;
     
    pdmodel=new UnlikedProducts(params);
        newpd = pdmodel.save()
        LikedProducts.deleteOne({username:params.username,name:params.name}, function (err) {
          if(err) console.log(err);
          console.log("Successful deletion");
        });
  const result = await UnlikedProducts.findOne({username:params.username,name:params.name}).exec();
    return result
  }
},

        addLikedProducts: {
type:likedProductsType,
args :{
  
  username: {
    type: GraphQLString
  },
  name: {
    type: GraphQLString
  },
  
  type: {
    type: GraphQLString
  }

},

resolve: async function(root,params){
  var pdmodel = null;
   
  pdmodel=new LikedProducts(params);
      newpd = pdmodel.save()
  
      UnlikedProducts.deleteOne({username:params.username,name:params.name}, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
      });

const result = await LikedProducts.findOne({username:params.username,name:params.name}).exec();
  return result
}


        },
        addPurchaseDetails: {
          type: purchaseDetailsType,
          args :{
            name: {
              type: GraphQLString
            },
            username: {
              type: GraphQLString
            },
            count: {
              type: GraphQLString
            }
          },
          resolve: async function(root,params){
            var pdmodel = null;
            var newpd=null; 
            PurchaseDetails.find({name:params.name,username:params.username}).then(async doc => {
              console.log(params.count)
              if(doc[0]==null){
                pdmodel=new PurchaseDetails(params);
                newpd = pdmodel.save()
            }
            else{
              var obj=await PurchaseDetails.findOne({name:params.name,username:params.username})
              var cnt=Number(obj.count)+1
              const cntstr=cnt.toString()
              console.log(cntstr)
              pdmodel=await PurchaseDetails.findOneAndUpdate({name:params.name,username:params.username},
                {count:cntstr},{
                  new: true
                })
              return pdmodel;
            }
              
            })
            .catch(err => {
              console.error(err)
            })
            
    const result = await LoginModel.findOne({username:params.username}).exec();
            return result
          }
        },
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
            LikedProducts.deleteMany({name:params.name}, function (err) {
              if(err) console.log(err);
              console.log("Successful deletion");
            })
            UnlikedProducts.deleteMany({name:params.name}, function (err) {
              if(err) console.log(err);
              console.log("Successful deletion");
            })
            PurchaseDetails.deleteMany({name:params.name}, function (err) {
              if(err) console.log(err);
              console.log("Successful deletion");
            })
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