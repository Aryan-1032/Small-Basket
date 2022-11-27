const mongoose = require('mongoose');

const SingleOrderItemSchema = mongoose.Schema({
  userId: String,
  products: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
],
});


module.exports = mongoose.model('Order', SingleOrderItemSchema);