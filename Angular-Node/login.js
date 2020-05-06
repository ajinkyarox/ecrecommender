var mongoose = require('mongoose');

var LoginSchema = new mongoose.Schema({
  
  username: String,
  password: String
});

module.exports = mongoose.model('logincredentials', LoginSchema);