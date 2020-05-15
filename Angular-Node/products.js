var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  
  name: String,
  type: String,
  details:String
});

module.exports = mongoose.model('products', ProductSchema);