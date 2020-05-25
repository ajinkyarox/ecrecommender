var mongoose = require('mongoose');

var UnlikedProductsSchema = new mongoose.Schema({
  
  username: String,
  name: String
});

module.exports = mongoose.model('unlikedproducts', UnlikedProductsSchema);