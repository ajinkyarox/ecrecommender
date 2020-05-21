var mongoose = require('mongoose');

var PurchaseDetailsSchema = new mongoose.Schema({
  
  name: String,
  username: String,
  count:Number
});
mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('purchasedetails', PurchaseDetailsSchema);