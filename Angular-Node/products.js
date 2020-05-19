var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  
  name: String,
  type: String,
  details:String
});
mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('products', ProductSchema);