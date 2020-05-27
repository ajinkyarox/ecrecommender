var mongoose = require('mongoose');

var LikedProductsSchema = new mongoose.Schema({
  
  username: String,
  name: String,
  type:String
});

module.exports = mongoose.model('likedproducts', LikedProductsSchema);